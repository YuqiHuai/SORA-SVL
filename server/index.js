const express = require("express");
const app = express();
const port = 3000;

var EventEmitter = require("events").EventEmitter;
var myEmitter = new EventEmitter();

function registerEventHandlers(req, res) {
  // Save received parameters
  const myParams = req.query;

  // Define function that adds "Hi" and send a SSE formated message
  const sayHi = function (params) {
    params["says"] = "Hi";
    let payloadString = JSON.stringify(params);
    res.write(`data: ${payloadString}\n\n`);
  };

  // Define function that adds "Bye" and send a SSE formated message
  const sayBye = function (params) {
    params["says"] = "Bye";
    let payloadString = JSON.stringify(params);
    res.write(`data: ${payloadString}\n\n`);
  };

  // Register what to do when inside-server 'hello' event happens
  myEmitter.on("hello", sayHi);

  myEmitter.on("ping", () => {
    res.write(`data: {data: '123'}\n\n`);
  });

  // Register what to do when inside-server 'goodbye' event happens
  myEmitter.on("goodbye", sayBye);

  // Register what to do when this channel closes
  req.on("close", () => {
    // Emit a server 'goodbye' event with "saved" params
    myEmitter.emit("goodbye", myParams);

    // Unregister this particular client listener functions
    myEmitter.off("hello", sayHi);
    myEmitter.off("goodbye", sayBye);
    console.log("<- close ", req.query);
  });
}

app.get("/clusters/runScenario", (req, res, next) => {
  console.log("runScenario");
  myEmitter.emit("ping");
  res.status(200).send();
});

app.get("/clusters/connect", (req, res, next) => {
  console.log("open -> ", req.query);

  // Emit a inside-server 'hello' event with the received params
  myEmitter.emit("hello", req.query);

  // SSE Setup
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.write("\n");

  // Register what to do when possible inside-server events happen
  registerEventHandlers(req, res);

  // Code execution ends here but channel stays open
  // Event handlers will use the open channel when inside-server events happen
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
