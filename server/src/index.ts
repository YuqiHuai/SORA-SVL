// SPDX-FileCopyrightText: (c) 2024 Yuqi Huai.
// SPDX-License-Identifier: BSD-3-Clause
// Modifications Copyright (c) 2025 Xronos Inc.

import express from "express";
import { clustersRouter, simulationsRouter } from "./routers/clusters.router";
import { apiRouter } from "./routers/api.router";
import { connectToDatabase } from "./services/database.service";
import dotenv from "dotenv";
import { assetsRouter } from "./routers/assets.router";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
const port = 3000;
dotenv.config();

connectToDatabase()
  .then(() => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use(express.json());
    app.use("/api/v1/clusters", clustersRouter);
    app.use("/api/v1/simulations", simulationsRouter);
    app.use("/api/v1/assets/download", assetsRouter);
    app.use("/api/v1", apiRouter);
    app.get("*", (req, res) => {
      console.log(`Caught GET at ${req.path}`);
      res.status(404).send({
        error: {
          code: "notExist",
        },
      });
    });

    app.post("*", (req, res) => {
      console.log(`Caught POST at ${req.path}`);
      console.log(req.body);
      res.status(404).send({
        error: {code: 'notExist'}
      })
    })
    app.put("*", (req, res) => {
      console.log(`Caught PUT at ${req.path}`);
      console.log(req.body);
      res.status(404).send({
        error: {code: 'notExist'}
      })
    })

    app.listen(port, () => {
      console.log(`Server began listening on port ${port}`);
    });
  })
  .catch((reason) => {
    console.log(reason);
  });
