#! /bin/bash

mongoimport --host localhost --db WISE --collection global --type json --file /docker-entrypoint-initdb.d/global.json --jsonArray
mongoimport --host localhost --db WISE --collection maps --type json --file /docker-entrypoint-initdb.d/maps.json --jsonArray
mongoimport --host localhost --db WISE --collection plugins --type json --file /docker-entrypoint-initdb.d/plugins.json --jsonArray
mongoimport --host localhost --db WISE --collection vehicles --type json --file /docker-entrypoint-initdb.d/vehicles.json --jsonArray
mongoimport --host localhost --db WISE --collection hd_maps --type json --file /docker-entrypoint-initdb.d/hd_maps.json --jsonArray