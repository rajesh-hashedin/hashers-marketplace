export interface Register {
  id: string;
  name: string;
  email: string;
  password: string;
}
export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  ownerEmail: string;
  request: any[];
  alreadySent: boolean;
  ownProduct: boolean;
}
