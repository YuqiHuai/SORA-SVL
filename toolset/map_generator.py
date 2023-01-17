# Generate Map Configuration from JSON
import json
from datetime import datetime
import argparse
from db_utils import WiseDB


class MapGenerator(object):

    def __init__(self):
        self.db = WiseDB()

    def insert_map_to_db(self, json_file):
        now = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
        with open(json_file, 'r') as f:
            map_config = json.load(f)

        # attributes = ['assetGuid', 'isShared', 'isFavored', 'isOwned', 'accessInfo', 'supportedSimulatorVersions', 'id',
        #               'name', 'description', 'copyright',
        #               'licenseName', 'ownerId', 'accessType', 'imageUrl', 'status', 'tags', 'owner', 'baseLink']

        # if map_cid is None:
        #     cid = self.db.generate_id_for_map()
        # else:
        #     cid = map_cid
        cid = map_config['id']
        name = map_config['name']

        config_template = dict()
        config_template['cid'] = cid
        config_template['name'] = name
        config_template['endpoint'] = '/api/v1/maps/{}'.format(cid)
        config_template['data'] = map_config

        with open("map_{}_{}.json".format(name, cid), 'w') as f:
            config_string = json.dump(config_template, f, indent=4)

        self.db.get_collection('maps').insert_one(config_template)
        print(cid)

        self.insert_to_global_db(map_config)
        self.insert_to_hdmaps_db(map_config)

    def insert_to_hdmaps_db(self, map_config):
        attributes = ['assetGuid', 'apollo50', 'autoware', 'lanelet2', 'opendrive']

        config_template = dict()
        config_template['assetGuid'] = map_config['assetGuid']
        config_template['apollo50'] = 'base_map.bin'
        config_template['autoware'] = 'AutowareVectorMap.zip'
        config_template['lanelet2'] = '{}.osm'.format(map_config['name'])
        config_template['opendrive'] = '{}.xodr'.format(map_config['name'])

        result = self.db.get_collection('hd_maps').insert_one(config_template)
        result = self.db.get_collection('hd_maps').find({'assetGuid':map_config['assetGuid']})
        for x in result:
            print(x)

    def insert_to_global_db(self, map_config):
        attributes = ['isShared', 'isFavored', 'isOwned', 'accessInfo', 'supportedSimulatorVersions', 'id',
              'name', 'description', 'copyright',
              'licenseName', 'ownerId', 'accessType', 'imageUrl', 'hdmaps', 'status', 'owner', 'shareRequests']

        config_template = dict()
        for k in attributes:
            if k == 'shareRequests':
                config_template[k] = ""
            else:
                config_template[k] = map_config[k]

        # insert the map config
        result = self.db.get_collection('global').update_one({'type': 'maps'},{"$push": {"data.rows": config_template}})

        # find the number of maps in the global database
        count_json = self.db.get_collection('global').aggregate([{'$match': {'type': 'maps'}}, {'$unwind': '$data.rows'}, {'$count': 'count'}])
        for x in count_json:
            print(x)
            new_count = x['count']
            # set the map count to 'count' field.
            self.db.get_collection('global').update_one({'type': 'maps'}, {"$set": {"data.count": new_count}})
        # check if the count if correct
        result = self.db.get_collection('global').aggregate([{'$match': {'type': 'maps'}}, {'$project': {'data.count':1}}])
        for x in result:
            print(x)

        #self.db.get_collection('global').aggregate([{'$match':{'type':'maps'}},{'$unwind':'$data.rows'},{'$match':{'data.rows.name': 'MyNewMap'}}])

if __name__ == '__main__':
    map_generator = MapGenerator()
    json_file = '../mongo/setup/download/maps_MyNewMap_f0af040b-6f39-4440-a656-fe82708cd2db.json'
    map_generator.insert_map_to_db(json_file)
    # main()
