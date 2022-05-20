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

export type Vehicle = {
  id: string;
  name: string;
  imageUrl: string;
  owner: {
    id: string;
    firstName: string;
    lastName: string;
  };
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
