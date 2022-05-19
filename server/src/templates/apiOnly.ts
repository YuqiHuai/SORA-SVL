const apiOnly = {
  version: "1.0",
  id: "067538a6-7d91-4624-8eb1-a24a32c2f91d",
  name: "API Only",
  ownerId: "4f162739-41d5-45a7-ab84-fafc75d9131d",
  interactive: true,
  headless: false,
  createdAt: "2020-06-08T21:50:08.000Z",
  updatedAt: "2020-06-08T21:50:08.000Z",
  template: {
    alias: "apiOnly",
    parameters: [
      {
        alias: "api-only",
        parameterName: "Start Simulator API",
        parameterType: "bool",
        variableType: "internal",
        variableName: "SIMULATOR_API_ONLY",
        value: true,
      },
    ],
  },
  cluster: {
    id: "03abf17f-a8a5-433b-b75e-9c331dc6c1db",
    name: "Local Cluster",
    ownerId: "4f162739-41d5-45a7-ab84-fafc75d9131d",
    createdAt: "2020-06-08T21:49:49.000Z",
    updatedAt: "2020-06-08T21:49:49.000Z",
    instances: [
      {
        simId: "75e07d7e-9089-4e82-a5fa-d29dbb48fc63",
        ip: ["127.0.0.1"],
        isMaster: true,
      },
    ],
  },
};

export default apiOnly;
