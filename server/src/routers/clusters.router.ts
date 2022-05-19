import express from "express";
import events from "events";
import apiOnly from "../templates/apiOnly";

export const clustersRouter = express.Router();

clustersRouter.use(express.json());

const clusterEmitter = new events.EventEmitter();

function registerClientEventHandlers(
  req: express.Request,
  res: express.Response
) {
  // connection established
  res.write(`data:{status:'OK'}\n\n`);

  clusterEmitter.on("CONFIG", (template) => {
    res.write(`data:{"status":"Config", "data":${template}}\n\n`);
  });

  // stop simulation
  clusterEmitter.on("STOP", () => {
    res.write("data:{'status':'Stop'}\n\n");
  });

  // disconnect client
  clusterEmitter.on("DISCONNECT", () => {
    res.write("data:{'status':'Disconnect'}\n\n");
  });

  // server notified when client closes connection
  req.on("close", () => {
    console.log("<- client disconnected");
  });
}

clustersRouter.post("/connect", (req, res) => {
  console.log("-> client connected");
  // set up SSE connection
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.write("\n");
  // register event handlers
  registerClientEventHandlers(req, res);
});

clustersRouter.get("/start/apiOnly", (req, res) => {
  console.log(req.path);
  // start an API ONLY simulation
  clusterEmitter.emit("STOP");
  clusterEmitter.emit("CONFIG", JSON.stringify(apiOnly));
  res.status(200).send("OK");
});

clustersRouter.get("/stop", (req, res) => {
  console.log(req.path);
  // stop the current simulation
  clusterEmitter.emit("STOP");
  res.status(200).send("OK");
});

clustersRouter.get("/disconnect", (req, res) => {
  console.log(req.path);
  // disconnect the cluster
  clusterEmitter.emit("DISCONNECT");
  res.status(200).send("OK");
});
