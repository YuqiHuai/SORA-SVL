export type Map = {
  id: string;
  name: string;
  imageUrl: string;
  owner: {
    id: string;
    firstName: string;
    lastName: string;
  };
};

export type Owner = {
  id: string;
  firstName: string;
  lastName: string;
};

export type SensorConfiguration = {
  id: string;
  name: string;
  owner: Owner;
};

export type Vehicle = {
  id: string;
  name: string;
  assetGuid: string;
  imageUrl: string;
  description: string;
  owner: {
    id: string;
    firstName: string;
    lastName: string;
  };
  sensorsConfigurations: SensorConfiguration[];
};

export type Plugin = {
  id: string;
  name: string;
  imageUrl: string;
  owner: {
    id: string;
    firstName: string;
    lastName: string;
  };
  category: string;
};
