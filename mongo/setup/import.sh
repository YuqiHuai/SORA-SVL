#! /bin/bash

mongoimport --host localhost --db WISE --collection global --mode=upsert --type json --file /docker-entrypoint-initdb.d/global.json --jsonArray
mongoimport --host localhost --db WISE --collection maps --mode=upsert --type json --file /docker-entrypoint-initdb.d/maps.json --jsonArray
mongoimport --host localhost --db WISE --collection plugins --mode=upsert --type json --file /docker-entrypoint-initdb.d/plugins.json --jsonArray
mongoimport --host localhost --db WISE --collection vehicles --mode=upsert --type json --file /docker-entrypoint-initdb.d/vehicles.json --jsonArray
mongoimport --host localhost --db WISE --collection hd_maps --mode=upsert --type json --file /docker-entrypoint-initdb.d/hd_maps.json --jsonArray
# mongoimport --host localhost --db WISE --collection geojson --mode=upsert --type json --file /docker-entrypoint-initdb.d/geojson.json --jsonArray