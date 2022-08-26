export type Map = {
  id: string;
  name: string;
  imageUrl: string;
  owner: Owner;
};

export type Owner = {
  id: string;
  firstName: string;
  lastName: string;
};

export type Sensor = {
  name: string;
  parent?: any;
  pluginId: string;
  sortKey: number;
  plugin: Plugin;
  type: string;
};

export type SensorConfiguration = {
  id: string;
  name: string;
  owner: Owner;
  sensors: Sensor[];
};

export type Vehicle = {
  id: string;
  name: string;
  assetGuid: string;
  imageUrl: string;
  description: string;
  owner: Owner;
  sensorsConfigurations: SensorConfiguration[];
};

export type Plugin = {
  id: string;
  name: string;
  imageUrl: string;
  owner: Owner;
  category: string;
};

export type SimulatorStatusMap = {
  [simulatorId: string]: SimulatorStatus;
}

export type SimulatorStatus = {
  alive: boolean;
  running: boolean;
};
