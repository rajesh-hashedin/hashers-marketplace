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
  ownerName: string;
  request: any[];
  alreadySent: boolean;
  ownProduct: boolean;
}
export interface IncomingRequest {
  productName: string;
  productPrice: string;
  productDescription: string;
  customerName: string;
  customerMobile: string;
  customerMessage: string;
}
