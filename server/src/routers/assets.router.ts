// SPDX-FileCopyrightText: (c) 2024 Yuqi Huai.
// SPDX-License-Identifier: BSD-3-Clause
// Modifications Copyright (c) 2025 Xronos Inc.

import express from "express";
import { collections } from "../services/database.service";
export const assetsRouter = express.Router();
import path from "path";
import fs from "fs";

//   https://wise.svlsimulator.com/api/v1/assets/download/preview/82946f68-4e4b-420b-8bcf-bb5ef10f8b41?type=small
//   https://wise.svlsimulator.com/api/v1/assets/download/bundle/cca8a560-0c11-491e-8604-c69b3eb45d91
//   https://wise.svlsimulator.com/api/v1/assets/download/preview/cca8a560-0c11-491e-8604-c69b3eb45d91?type=small

const dir = path.join(__dirname, "../../assets");
const allowedPreviewTypes = [
  "small",
  "small2x",
  "medium",
  "medium2x",
  "large",
  "large2x",
];

function sendFile(file_path: string, file_type: string, res: express.Response) {
  const stream = fs.createReadStream(file_path);
  stream.on("open", function () {
    res.set("Content-Type", file_type);
    stream.pipe(res);
  });
  stream.on("error", function () {
    res.set("Content-Type", "text/plain");
    res.status(404).end("Not found");
  });
}

assetsRouter.get("/preview/:id", async (req, res) => {
  const id = req!.params!.id;
  const type = req!.query!.type ? (req!.query!.type as string) : "medium";

  if (!allowedPreviewTypes.includes(type)) {
    res.status(400).send([
      {
        message: "type should be equal to one of the allowed values",
        allowedValues: allowedPreviewTypes,
      },
    ]);
  }

  const map = await collections.maps.findOne({ "data.assetGuid": id });
  if (map) {
    // this is map
    const file = path.join(dir, `/preview/maps/${id}/${type}.webp`);
    const file_type = "image/webp";
    sendFile(file, file_type, res);
    return;
  }

  const plugin = await collections.plugins.findOne({ "data.assetGuid": id });
  if (plugin) {
    // this is plugin
    const file = path.join(dir, `/preview/plugins/${plugin.data.category}.svg`);
    const file_type = "image/svg+xml";
    sendFile(file, file_type, res);
    return;
  }

  const vehicle = await collections.vehicles.findOne({ "data.assetGuid": id });
  if (vehicle) {
    // this is a vehicle
    const file = path.join(dir, `preview/vehicles/${id}/${type}.webp`);
    const file_type = "image/webp";
    sendFile(file, file_type, res);
    return;
  }

  // invalid id
  res.status(404).send({
    error: {
      code: "notExist",
      message: `No preview found for ${id}. Make sure you are providing valid assetGuid.`,
    },
  });
});

assetsRouter.get("/bundle/:id", async (req, res) => {
  const id = req!.params!.id;

  const map = await collections.maps.findOne({ "data.assetGuid": id });
  if (map) {
    // this is map
    const file = path.join(dir, `/maps/${id}`);
    const file_type = "application/octet-stream";
    sendFile(file, file_type, res);
    return;
  }

  const plugin = await collections.plugins.findOne({ "data.assetGuid": id });
  if (plugin) {
    // this is plugin
    const file = path.join(dir, `/plugins/${id}`);
    const file_type = "application/octet-stream";
    sendFile(file, file_type, res);
    return;
  }

  const vehicle = await collections.vehicles.findOne({ "data.assetGuid": id });
  if (vehicle) {
    // this is a vehicle
    const file = path.join(dir, `/vehicles/${id}`);
    const file_type = "application/octet-stream";
    sendFile(file, file_type, res);
    return;
  }

  // invalid id
  console.log(`Error downloading bundle ${id}`)
  res.status(404).send({
    error: {
      code: "notExist",
      message: `No bundle found for ${id}. Make sure you are providing valid assetGuid.`,
    },
  });
});

assetsRouter.get("/bundle/:id", (req, res) => {
  const id = req!.params!.id;
  res.status(200).send("ok");
});

assetsRouter.get("/");
