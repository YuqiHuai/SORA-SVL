# Generate Sensor Configuration from JSON
import json
from datetime import datetime
import argparse
from db_utils import WiseDB


class config_generator(object):

    def __init__(self, vehicle_id, bridge_id):
        self.db = WiseDB()
        self.vehicle_id = vehicle_id
        self.bridge_id = bridge_id

        self.vehicle_asset = self.db.get_vehicle_by_id(self.vehicle_id)
        assert self.vehicle_asset, 'Vehicle does not exist'
        assert self.vehicle_asset['ctype'] == 'vehicle', 'Not a base vehicle'

        self.bridge_asset = self.db.get_plugin_by_id(self.bridge_id)
        assert self.bridge_asset, 'Bridge does not exist'
        assert self.bridge_asset['data']['category'] == 'bridge', 'Not a bridge'

    def generate_config(self, sensor_config_fp, name, sensor_cid=None):
        '''
        :param sensor_config_fp:
        :param name: the name of the sensor_configurations, should same as wise.svlsimulator.com
        :param sensor_cid: from https://wise.svlsimulator.com/vehicles/profile/{vehicle_cid}/edit/configuration/{sensor_cid}
        :return:
        '''
        now = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
        with open(sensor_config_fp, 'r') as f:
            sensor_config = json.load(f)

        attributes = ['assetGuid', 'isShared', 'isFavored', 'isOwned', 'accessInfo', 'supportedSimulatorVersions', 'id',
                      'name', 'description', 'copyright',
                      'licenseName', 'ownerId', 'accessType', 'imageUrl', 'status', 'tags', 'owner', 'baseLink']

        if sensor_cid is None:
            cid = self.db.generate_id_for_vehicle()
        else:

            cid = sensor_cid

        config_template = dict()
        config_template['name'] = name
        config_template['cid'] = cid
        config_template['ctype'] = "configuration"
        config_template['endpoint'] = '/api/v1/vehicles/{}'.format(cid)
        config_template['data'] = dict()
        for k in attributes:
            config_template['data'][k] = self.vehicle_asset['data'][k]

        config_template['data']['bridge'] = self.bridge_asset['data']

        config_template['data']['sensors'] = []
        for sensor in sensor_config:
            sensor_dict = dict()
            sensor_id = sensor['pluginId']
            try:
                asset_guid = self.db.get_plugin_assetGuid_by_id(sensor_id)
                assert asset_guid
                sensor_dict['name'] = sensor['name']
                sensor_dict['parent'] = sensor['parent']
                sensor_dict['pluginId'] = sensor['pluginId']
                sensor_dict['sortKey'] = sensor['sortKey']
                sensor_dict['type'] = sensor['plugin']['type']
                sensor_dict['plugin'] = sensor['plugin']
                sensor_dict['plugin']['assetGuid'] = asset_guid
                # sensor_dict['plugin']['id'] = sensor_id
                # sensor_dict['plugin']['type'] = sensor['plugin']['type']
                try:
                    sensor_dict['params'] = sensor['params']
                except(KeyError):
                    print("No Params for Sensor: {}".format(sensor['name']))
                try:
                    sensor_dict['transform'] = sensor['transform']
                except(KeyError):
                    print("No Transform for Sensor: {}".format(sensor['name']))
                config_template['data']['sensors'].append(sensor_dict)
            except(AssertionError):
                asset_guid = 'Sensor not in MongoDB'
                print(" Sensor Name: {}, Sensor ID: {}, Asset GUID: {}".format(
                    sensor['type'], sensor_id, asset_guid))

        # with open("{}.json".format(cid), 'w') as f:
        #     config_string = json.dump(config_template, f, indent=4)

        self.db.get_collection('vehicles').insert_one(config_template)
        print(cid)

        self.insert_to_vehicle_sensor_index(config_template)

    def insert_to_vehicle_sensor_index(self, sensor_config):
        now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S.000Z")
        config_template = dict()
        config_template["isShared"] = sensor_config['data']["isShared"]
        config_template["isOwned"] = sensor_config['data']["isOwned"]
        config_template["id"] = sensor_config["cid"]
        config_template["name"] = sensor_config["name"]
        config_template["ownerId"] = sensor_config['data']["ownerId"]
        config_template["vehicleId"] = sensor_config['data']["id"]
        config_template["accessType"] = sensor_config['data']["accessType"]
        config_template["bridgePluginId"] = sensor_config["data"]["bridge"]["id"]
        config_template["createdAt"] = now
        config_template["updatedAt"] = now
        config_template["bridge"] = sensor_config["data"]["bridge"]
        config_template["owner"] = sensor_config["data"]["owner"]
        config_template["sensors"] = []

        for sensor in sensor_config['data']["sensors"]:
            sensor_dict = dict()
            sensor_id = sensor['pluginId']
            try:
                asset_guid = self.db.get_plugin_assetGuid_by_id(sensor_id)
                assert asset_guid
                try:
                    sensor_dict['params'] = sensor['params']
                except(KeyError):
                    print("No Params for Sensor: {}".format(sensor['name']))
                try:
                    sensor_dict['transform'] = sensor['transform']
                except(KeyError):
                    print("No Transform for Sensor: {}".format(sensor['name']))
                sensor_dict['name'] = sensor['name']
                sensor_dict['parent'] = sensor['parent']
                sensor_dict["pluginId"] = sensor['pluginId']
                sensor_dict['sortKey'] = sensor['sortKey']
                sensor_dict['plugin'] = sensor['plugin']
                try:
                    del sensor_dict['plugin']['assetGuid']
                except KeyError:
                    print('No assetGuid for sensor:{}'.format(sensor['name']))
                try:
                    del sensor_dict['plugin']['assetBundles']
                except KeyError:
                    print('No assetBundles for sensor:{}'.format(sensor['name']))
                sensor_dict['type'] = sensor['type']
                config_template['sensors'].append(sensor_dict)
            except AssertionError:
                asset_guid = 'Sensor not in MongoDB'
                print(" Sensor Name: {}, Sensor ID: {}, Asset GUID: {}".format(
                    sensor['name'], sensor_id, asset_guid))

        # insert into the mongodb
        self.db.get_collection('vehicles').update_one({'ctype': 'vehicle', 'cid': config_template['vehicleId']},
                                                      {"$push": {"data.sensorsConfigurations": config_template}})

        result = self.db.get_collection('vehicles').aggregate(
            [{'$match': {'ctype': 'vehicle', 'cid': config_template['vehicleId']}},
             {'$unwind': '$data.sensorsConfigurations'},
             {'$match': {'data.sensorsConfigurations.id': config_template['id']}}])
        for x in result:
            print(x)
        print('Done')


def testMain():
    # Lincoln2017MKZ
    # 73805704-1e46-4eb6-b5f9-ec2244d5951e
    # cyberRT Bridge
    # ff4ba32f-8885-4847-9a8b-fd21e6603202

    # vehicle: Lexus2016RXHybrid: 2c4aa799-dfd8-4d1a-86de-beff796bd95c
    # bridge: ROS2 bridge: 05a095cc-bab5-4e7b-981c-314d54351550
    # sensor_config: DuoRos2Ultra12Radar_f21bc787-5045-4a0b-8366-a5fa23bc20d2.json
    vehicle_Lexus2016RXHybrid = '2c4aa799-dfd8-4d1a-86de-beff796bd95c'
    bridge_ROS2 = '05a095cc-bab5-4e7b-981c-314d54351550'
    sensor_config_filename = './sample_data/DuoRos2Ultra12Radar_f21bc787-5045-4a0b-8366-a5fa23bc20d2.json'
    sensor_config_name = 'DuoRos2Ultra12Radar'
    sensor_config_cid = 'f21bc787-5045-4a0b-8366-a5fa23bc20d2'
    config_gen = config_generator(vehicle_Lexus2016RXHybrid, bridge_ROS2)
    config_gen.generate_config(sensor_config_filename, sensor_config_name, sensor_config_cid)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--vehicle_id', type=str, help='vehicle cid')
    parser.add_argument('--bridge_id', type=str, help='bridge cid')
    parser.add_argument('--sensor_config', type=str,
                        help='name of configuration file')
    parser.add_argument('--config_name', type=str,
                        help='name of configuration')

    args = parser.parse_args()
    vehicle_id = args.vehicle_id
    bridge_id = args.bridge_id
    sensor_config_fp = args.sensor_config
    config_name = args.config_name

    config_gen = config_generator(vehicle_id, bridge_id)
    config_gen.generate_config(sensor_config_fp, config_name)


if __name__ == '__main__':
    testMain()
    # main()
