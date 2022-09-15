import pymongo
from uuid import uuid4


class WiseDB:
    def __init__(self) -> None:
        self.client = pymongo.MongoClient('mongodb://localhost:28018')
        self.db = self.client['WISE']

    def get_collection(self, collection_name: str):
        return self.db[collection_name]

    def _get_x_by_id(self, x: str, x_id: str):
        assert x in ['maps', 'vehicles', 'plugins']
        return self.get_collection(x).find_one({'cid': x_id})

    def _get_x_assetGuid_by_id(self, x: str, x_id: str):
        obj = self._get_x_by_id(x, x_id)
        if obj:
            return obj['data']['assetGuid']
        return None

    def get_map_by_id(self, map_id: str):
        return self._get_x_by_id('maps', map_id)

    def get_map_assetGuid_by_id(self, map_id: str):
        return self._get_x_assetGuid_by_id('maps', map_id)

    def get_vehicle_by_id(self, vehicle_id: str):
        return self._get_x_by_id('vehicles', vehicle_id)

    def get_vehicle_assetGuid_by_id(self, vehicle_id: str):
        return self._get_x_assetGuid_by_id('vehicles', vehicle_id)

    def get_plugin_by_id(self, plugin_id: str):
        return self._get_x_by_id('plugins', plugin_id)

    def get_plugin_assetGuid_by_id(self, plugin_id: str):
        return self._get_x_assetGuid_by_id('plugins', plugin_id)

    def _generate_id_for_x(self, x: str):
        assert x in ['maps', 'vehicles', 'plugins']
        while True:
            new_id = str(uuid4())
            if self._get_x_by_id(x, new_id):
                continue
            return new_id

    def generate_id_for_map(self):
        return self._generate_id_for_x('maps')

    def generate_id_for_vehicle(self):
        return self._generate_id_for_x('vehicles')

    def generate_id_for_plugin(self):
        return self._generate_id_for_x('plugins')


if __name__ == '__main__':
    db = WiseDB()
    print(db.generate_id_for_map())
