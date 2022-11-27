export enum CardType {
  PRODUCT_LIST = 'Product List',
  CART = 'Cart',
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

export interface Cart {
  id: number;
  title: string;
  price: number;
  quantity: number;
}
