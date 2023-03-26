export type Product = {
  _id: string;
  type: string;
  brand: string;
  model: string;
  price: number;
  discount?: number;
};

export type User = {
  username: string;
  password: string;
};

export type Filter = {
  type: string;
  brand: string;
  discounted: boolean | null;
};
