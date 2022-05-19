import express from "express";
import { clustersRouter } from "./routers/clusters.router";
import { apiRouter } from "./routers/api.router";
import { connectToDatabase } from "./services/database.service";

const app = express();
const port = 3000;

connectToDatabase()
  .then(() => {
    app.use("/api/v1/clusters", clustersRouter);
    app.use("/api/v1", apiRouter);
    app.get("*", (req, res) => {
      console.log(`Caught GET at ${req.path}`);
      res.status(404).send({
        error: {
          code: "notExist",
        },
      });
    });

    app.listen(port, () => {
      console.log(`Server began listening on port ${port}`);
    });
  })
  .catch((reason) => {
    console.log(reason);
  });
