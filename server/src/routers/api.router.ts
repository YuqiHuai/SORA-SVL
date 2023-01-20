import { log } from "console";
import express from "express";
import { Long } from "mongodb";
import { collections } from "../services/database.service";
export const apiRouter = express.Router();

apiRouter.get("/maps", async (req, res) => {
  log('request=------------------%s', req.query);
  let display = req.query.display;
  let limit = req.query.limit;
  let offset = req.query.offset;
  log('display=%s,limit=%s,offset=%s', display, typeof (limit), typeof (offset));

  if (display != null) {
    var count = await collections.maps.aggregate([{ "$count": "count" }]).toArray()
    // count.forEach(function(doc) {
    //   log('debug: doc=%s',doc);
    // })
    log("debug: count=%s+++++++", JSON.stringify(count));
    var maps = await collections.maps.aggregate([{ "$replaceWith": { rows: "$data" } },
    {
      $project: {
        "rows.lastVersionDate": 0, "rows.lastAssetGuid": 0, "rows.supportedPlatforms": 0, "rows.version": 0, "rows.authorName": 0, "rows.authorUrl": 0,
        "rows.createdAt": 0, "rows.updatedAt": 0, "rows.tags": 0
      }
    },
    { $addFields: { "rows.shareRequests": [] } },
    {
      $group: {
        "_id": null,
        "rows": { "$firstN": { "input": "$rows", n: 150 } },
        "count": { "$count": {} }
      }
    },
    { $project: { "_id": 0, "count": 1, "rows": 1 } }
    ]).toArray();
    log("debug:maps=-------:%s+++++", JSON.stringify(maps[0]));
    res.status(200).send(maps[0]);
  } else {

    const maps = await collections.global.findOne({ type: "maps" });
    res.status(200).send(maps.data);
  }
});

apiRouter.get("/maps/:id", async (req, res) => {
  const id = req!.params!.id;
  const map = await collections.maps.findOne({ cid: id });
  if (map) {
    res.status(200).send(map.data);
  } else {
    res.status(400).send({
      error: { code: "notExist", message: "Map does not exist" },
    });
  }
});

apiRouter.get("/plugins", async (req, res) => {
  const plugins = await collections.global.findOne({ type: "plugins" });
  res.status(200).send(plugins.data);
});

apiRouter.get("/plugins/:id", async (req, res) => {
  const id = req!.params!.id;
  const plugin = await collections.plugins.findOne({ cid: id });
  if (plugin) {
    res.status(200).send(plugin.data);
  } else {
    res.status(404).send({
      error: {
        code: "notExist",
        message: "Plugin does not exist",
      },
    });
  }
});

apiRouter.get("/vehicles", async (req, res) => {
  log('request=------------------%s', req.query);
  let display = req.query.display;
  let limit = req.query.limit;
  let offset = req.query.offset;
  log('/vehicles: display=%s,limit=%s,offset=%s', display, typeof (limit), typeof (offset));

  if (display != null) {
    var count = await collections.vehicles.aggregate([{ "$match": { "ctype": "vehicle" } }, { "$count": "count" }]).toArray()
    // count.forEach(function(doc) {
    //   log('debug: doc=%s',doc);
    // })
    var vehicle_count = count[0].count;

    log("debug: vechiles: count=%s+++++++", JSON.stringify(count));
    var vehicles = await collections.vehicles.aggregate([
      { "$match": { "ctype": "vehicle" } },
      { "$replaceWith": { rows: "$data" } },
      {
        $project: {
          "rows.lastVersionDate": 0, "rows.lastAssetGuid": 0, "rows.supportedPlatforms": 0, "rows.version": 0, "rows.authorName": 0, "rows.authorUrl": 0,
          "rows.createdAt": 0, "rows.updatedAt": 0, "rows.tags": 0, "rows.fmu": 0, "rows.baseLink": 0, "rows.sensorsConfigurations.owner": 0
        }
      },
      { $addFields: { "rows.shareRequests": [], "rows.sensorsConfigurations.sharedWith": [] } },
      {
        $group: {
          "_id": null,
          "rows": { "$firstN": { "input": "$rows", n: vehicle_count } },
          "count": { "$count": {} }
        }
      },
      { $project: { "_id": 0, "count": 1, "rows": 1 } }
    ]).toArray();
    log("debug:vechiles:=-------:%s+++++", JSON.stringify(vehicles[0]));
    res.status(200).send(vehicles[0]);
  } else {
    const vehicles = await collections.global.findOne({ type: "vehicles" });
    res.status(200).send(vehicles.data);
  }
});

apiRouter.get("/vehicles/:id", async (req, res) => {
  const id = req!.params!.id;
  const vehicle = await collections.vehicles.findOne({ cid: id });
  if (vehicle) {
    res.status(200).send(vehicle.data);
  } else {
    res.status(404).send({
      error: {
        code: "notExist",
        message: `Vehicle ${id} does not exist`,
      },
    });
  }
});
