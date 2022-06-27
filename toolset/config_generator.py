# Generate Sensor Configuration from JSON
import json
import os
import sys
from datetime import datetime
import argparse

class config_generator(object):

    def __init__(self, vehicle_id, bridge_id):
        
        self.vehicle_id = vehicle_id
        self.bridge_id = bridge_id
        self.bridge_asset = None
        self.vehicle_asset = None

        plugins_path = '../mongo/plugins.json'
        with open(plugins_path, 'r+') as f:
            plugins_log  = json.load(f)
        self.plugin_id2guid = dict()
        self.plugin_guid2id = dict()

        for plugin in plugins_log:
            plugin_data = plugin['data']
            self.plugin_id2guid[plugin['cid']] = plugin_data['assetGuid']
            self.plugin_guid2id[plugin_data['assetGuid']] = plugin['cid']
            if plugin['cid'] == bridge_id:
                self.bridge_asset = plugin

        vehicles_path = '../mongo/vehicles.json'
        with open(vehicles_path, 'r+') as f:
            vehicles_log  = json.load(f)
        self.config_template = dict()
        self.vehicle_id2guid = dict()
        self.vehicle_guid2id = dict()

        for vehicle in vehicles_log:
            try:
                if vehicle['ctype'] == 'vehicle':
                    vehicle_data = vehicle['data']
                    self.vehicle_id2guid[vehicle['cid']] = vehicle_data['assetGuid']
                    self.vehicle_guid2id[vehicle_data['assetGuid']] = vehicle['cid']
                    if vehicle['cid'] == vehicle_id:
                        self.vehicle_asset = vehicle
            except(KeyError):
                continue

        for vehicle in vehicles_log:
            if vehicle['ctype'] == 'configuration':
                self.config_template = vehicle
                break
    
    def generate_config(self, sensor_config_fp, cid, name):

        now = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
        with open(sensor_config_fp, 'r') as f:
            sensor_config = json.load(f)

        self.config_template['name']     = name
        self.config_template['cid']      = cid
        self.config_template['endpoint'] = '/api/v1/vehicles/{}'.format(cid)
        self.config_template['data']['assetGuid']    = self.vehicle_id2guid[self.vehicle_id]
        self.config_template['data']['id']           = self.vehicle_id
        self.config_template['data']['name']         = self.vehicle_asset['data']['name']
        self.config_template['data']['ownerId']      = self.vehicle_asset['data']['ownerId']
        self.config_template['data']['accessType']   = self.vehicle_asset['data']['accessType']
        self.config_template['data']['imageUrl']     = self.vehicle_asset['data']['imageUrl']
        self.config_template['data']['status']       = self.vehicle_asset['data']['status']
        self.config_template['data']['tags']         = self.vehicle_asset['data']['tags']
        self.config_template['data']['owner']        = self.vehicle_asset['data']['owner']
        self.config_template['data']['shareRequests']= self.vehicle_asset['data']['shareRequests']
        self.config_template['data']['favoredBy']    = self.vehicle_asset['data']['favoredBy']
        self.config_template['data']['sharedWith']   = self.vehicle_asset['data']['sharedWith']
        self.config_template['data']['createdAt']     = now
        self.config_template['data']['updatedAt']     = now
        self.config_template['data']['bridge']        = dict()
        try:
            self.config_template['data']['bridge']['id']                 = self.bridge_asset['data']['id']
            self.config_template['data']['bridge']['name']               = self.bridge_asset['data']['name']
            self.config_template['data']['bridge']['assetGuid']          = self.bridge_asset['data']['assetGuid']
            self.config_template['data']['bridge']['type']               = self.bridge_asset['data']['type']
        except(KeyError, TypeError):
            self.config_template['data']['bridge']    = None
        self.config_template['data']['sensors']       = []
        for sensor in sensor_config:
            sensor_dict = dict()
            sensor_id = sensor['pluginId']
            try :
                asset_guid = self.plugin_id2guid[sensor_id]
                sensor_dict['name']                = sensor['name']
                sensor_dict['parent']              = sensor['parent']
                sensor_dict['type']                = sensor['type']
                sensor_dict['plugin']              = dict()
                sensor_dict['plugin']['id']        = sensor_id
                sensor_dict['plugin']['type']      = sensor['plugin']['type']
                sensor_dict['plugin']['assetGuid'] = asset_guid
                try:
                    sensor_dict['params']    = sensor['params']
                except(KeyError):
                    print("No Params for Sensor: {}".format(sensor['name']))
                try:
                    sensor_dict['transform']           = sensor['transform']
                except(KeyError):
                    print("No Transform for Sensor: {}".format(sensor['name']))
                self.config_template['data']['sensors'].append(sensor_dict)
            except(KeyError):
                asset_guid = 'Sensor not in MongoDB'
                print(" Sensor Name: {}, Sensor ID: {}, Asset GUID: {}".format(sensor['type'], sensor_id,asset_guid))

        with open("{}.json".format(cid), 'w') as f:
            config_string = json.dump(self.config_template, f, indent = 4)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--vehicle_id', type=str, help='vehicle cid')
    parser.add_argument('--bridge_id', type=str, help='vehicle cid')
    parser.add_argument('--sensor_config', type=str, help='name of configuration file')
    parser.add_argument('--config_name', type=str, help='name of configuration')
    parser.add_argument('--cid', type=str, help='unique id for database')
    
    args = parser.parse_args()
    vehicle_id = args.vehicle_id
    bridge_id = args.bridge_id
    sensor_config_fp = args.sensor_config
    cid_generator = args.cid ## TBD: generate unique cid
    config_name = args.config_name

    config_gen = config_generator(vehicle_id, bridge_id)
    config_gen.generate_config(sensor_config_fp, cid_generator, config_name)

if __name__=='__main__':
    main()
    