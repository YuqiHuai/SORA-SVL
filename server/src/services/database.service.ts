// SPDX-FileCopyrightText: (c) 2024 Yuqi Huai.
// SPDX-License-Identifier: BSD-3-Clause
// Modifications Copyright (c) 2025 Xronos Inc.

import * as mongoDB from "mongodb";

export const collections: {
  global?: mongoDB.Collection;
  maps?: mongoDB.Collection;
  plugins?: mongoDB.Collection;
  vehicles?: mongoDB.Collection;
} = {};

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.MONGO_URL
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.MONGO_DB_NAME);

  collections.global = db.collection("global");
  collections.maps = db.collection("maps");
  collections.plugins = db.collection("plugins");
  collections.vehicles = db.collection("vehicles");
}
