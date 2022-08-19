import express from "express";
import events from "events";
import apiOnly from "../templates/apiOnly";

export const clustersRouter = express.Router();
interface SimulatorStatus {
  alive: boolean;
  running: boolean;
}

clustersRouter.use(express.json());

const clusterEmitter = new events.EventEmitter();
const simulatorStatus: {[SimulatorId: string]: SimulatorStatus} = {};

function registerClientEventHandlers(
  req: express.Request,
  res: express.Response
) {
  const simId = req.headers['simid'] as string;
  simulatorStatus[simId] = { alive: true, running: false };

  // connection established
  res.write(`data:{status:'OK'}\n\n`);

  clusterEmitter.on(`CONFIG-${simId}`, (template) => {
    res.write(`data:{"status":"Config", "data":${template}}\n\n`);
    simulatorStatus[simId].running = true;
  });

  // stop simulation
  clusterEmitter.on(`STOP-${simId}`, () => {
    res.write("data:{'status':'Stop'}\n\n");
    simulatorStatus[simId].running = false;
  });

  // disconnect client
  clusterEmitter.on(`DISCONNECT-${simId}`, () => {
    res.write("data:{'status':'Disconnect'}\n\n");
    simulatorStatus[simId].alive = false;
  });

  // server notified when client closes connection
  res.on('close', () => {
    console.log(`<- client ${simId} disconnected`)
    simulatorStatus[simId] = { alive: false, running: false };
  });
}

clustersRouter.post("/connect", (req, res) => {
  const simId = req.headers['simid'];
  console.log(`-> client ${simId} connected`);
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

clustersRouter.get("/simulatorStatus", (req, res) => {
  console.log(req.path);
  // return simulator status
  res.status(200).json(simulatorStatus);
});

clustersRouter.get("/start/apiOnly/:simId", (req, res) => {
  console.log(req.path);
  const simId = req.params.simId;
  // start an API ONLY simulation
  if (simulatorStatus[simId].alive) {
    clusterEmitter.emit(`CONFIG-${simId}`, JSON.stringify(apiOnly));
  }
  res.status(200).send("OK");
});

clustersRouter.get("/stop/:simId", (req, res) => {
  console.log(req.path);
  const simId = req.params.simId;
  // stop the current simulation
  clusterEmitter.emit(`STOP-${simId}`);
  res.status(200).send("OK");
});

clustersRouter.get("/disconnect/:simId", (req, res) => {
  console.log(req.path);
  const simId = req.params.simId;
  // disconnect the cluster
  clusterEmitter.emit(`DISCONNECT-${simId}`);
  res.status(200).send("OK");
});
