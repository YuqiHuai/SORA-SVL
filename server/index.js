const express = require("express");
const app = express();
const port = 3000;

var EventEmitter = require("events").EventEmitter;
var clusterEmitter = new EventEmitter();

function registerClientEventHandlers(req, res) {
    res.write(`data:{status:'OK'}\n\n`);

    clusterEmitter.on("START:API_ONLY", (template) => {
        res.write(`data:{"status":"Config", "data":${template}}\n\n`);
    });

    clusterEmitter.on("STOP", () => {
        res.write("data:{'status':'Stop'}\n\n");
    });

    clusterEmitter.on("DISCONNECT", () => {
        res.write("data:{'status':'Disconnect'}\n\n");
    });

    // Register what to do when this channel closes
    req.on("close", () => {
        console.log("<- client disconnected");
    });
}

app.get("/api/v1/clusters/start/apiOnly", (req, res) => {
    console.log('-> EMIT START:API_ONLY');
    var templateJson = {
        "version": "1.0",
        "id": "067538a6-7d91-4624-8eb1-a24a32c2f91d",
        "name": "API Only",
        "ownerId": "4f162739-41d5-45a7-ab84-fafc75d9131d",
        "interactive": true,
        "headless": false,
        "createdAt": "2020-06-08T21:50:08.000Z",
        "updatedAt": "2020-06-08T21:50:08.000Z",
        "template": {
            "alias": "apiOnly",
            "parameters": [
                {
                    "alias": "api-only",
                    "parameterName": "Start Simulator API",
                    "parameterType": "bool",
                    "variableType": "internal",
                    "variableName": "SIMULATOR_API_ONLY",
                    "value": true
                },
            ]
        },
        "cluster": {
            "id": "03abf17f-a8a5-433b-b75e-9c331dc6c1db",
            "name": "Local Cluster",
            "ownerId": "4f162739-41d5-45a7-ab84-fafc75d9131d",
            "createdAt": "2020-06-08T21:49:49.000Z",
            "updatedAt": "2020-06-08T21:49:49.000Z",
            "instances": [
                {
                    "simId": "75e07d7e-9089-4e82-a5fa-d29dbb48fc63",
                    "ip": [
                        "127.0.0.1"
                ],
                "isMaster": true
                }
            ]
        }
    }
    clusterEmitter.emit("START:API_ONLY", JSON.stringify(templateJson));
    res.status(200).send('OK')
});

app.get("/api/v1/clusters/stop", (req, res) => {
    console.log('-> EMIT STOP');
    clusterEmitter.emit("STOP");
    res.status(200).send('OK');
});

app.get("/api/v1/clusters/disconnect", (req, res) => {
    console.log('-> EMIT DISCONNECT');
    clusterEmitter.emit("DISCONNECT")
    res.status(200).send('OK');
});


// client connect
app.post("/api/v1/clusters/connect", (req,res) => {
    console.log('-> client connected')
    // set up SSE
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });
    res.write("\n");
    registerClientEventHandlers(req, res);
});

app.get('/api/v1/maps/aae03d2a-b7ca-4a88-9e41-9035287a12cc', (req, res) => {
    res.status(200).send({"assetGuid":"4552b7ac-4fba-4420-88b8-ae14289bf5ac","isShared":false,"isFavored":true,"isOwned":false,"accessInfo":{"userAccessType":"favored","owner":{"id":"0d888b00-fa53-47c1-882a-b68391268a11","firstName":"SVL","lastName":"Content"}},"geoJsonUrl":"/api/v1/assets/download/geojson/4552b7ac-4fba-4420-88b8-ae14289bf5ac","supportedSimulatorVersions":["2021.3","2021.2","2021.2.2","2021.1","2021.1.1"],"id":"aae03d2a-b7ca-4a88-9e41-9035287a12cc","name":"BorregasAve","description":"The Borregas Avenue map is a Digital Twin environment of a real-world street block in Sunnyvale, CA (https://goo.gl/maps/qtCmLm2HSqbofUx8A). It features two-lane roads as well as one traffic light intersection and one stop sign intersection.","copyright":"LG Electronics Inc.","licenseName":"LG Content","ownerId":"0d888b00-fa53-47c1-882a-b68391268a11","accessType":"public","imageUrl":"/api/v1/assets/download/preview/4552b7ac-4fba-4420-88b8-ae14289bf5ac","hdmaps":"apollo30,apollo50,autoware,lanelet2,opendrive","status":"active","tags":[{"name":"lg","meta":{"sortKey":0}},{"name":"test","meta":{"sortKey":1}},{"name":"real-world","meta":{"sortKey":2}}],"owner":{"id":"0d888b00-fa53-47c1-882a-b68391268a11","firstName":"SVL","lastName":"Content"},"shareRequests":[],"favoredBy":[],"sharedWith":[]})
})
// app.get('/api/v1/vehicles/47b529db-0593-4908-b3e7-4b24a32a0f70', (req, res) => {
//     res.status(200).send({"error":{"code":"notExist","message":"Vehicle 47b529db-0593-4908-b3e7-4b24a32a0f70 does not exist"}})
// })

app.get('/*', (req, res) => {
    console.log(req.path);
    res.status(200).send('NotImplemented');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
