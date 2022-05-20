import express from "express";
import { collections } from "../services/database.service";
export const apiRouter = express.Router();

apiRouter.get("/maps", async (req, res) => {
  const maps = await collections.global.findOne({ type: "maps" });
  res.status(200).send(maps.data);
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
  const vehicles = await collections.global.findOne({ type: "vehicles" });
  res.status(200).send(vehicles.data);
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
