import * as mongoDB from "mongodb";

export const collections: {
  global?: mongoDB.Collection;
  maps?: mongoDB.Collection;
  plugins?: mongoDB.Collection;
  vehicles?: mongoDB.Collection;
} = {};

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    "mongodb://localhost:27017"
  );

  await client.connect();

  const db: mongoDB.Db = client.db("WISE");

  collections.global = db.collection("global");
  collections.maps = db.collection("maps");
  collections.plugins = db.collection("plugins");
  collections.vehicles = db.collection("vehicles");
}
