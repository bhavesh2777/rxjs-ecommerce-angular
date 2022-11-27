import { Cart, Product } from './models/home.model';

export const snackBarConfig: any = {
  horizontalPosition: 'end',
  verticalPosition: 'top',
  duration: 3000,
};

export const apiUrl = 'https://dummyjson.com/';

export const numberOnlyRegex = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/;

export const productTableColumns = [
  {
    columnDef: 'id',
    header: 'Id',
    cell: (element: Product) => `${element.id}`,
  },
  {
    columnDef: 'name',
    header: 'Name',
    cell: (element: Product) => `${element.title}`,
  },
  {
    columnDef: 'description',
    header: 'Description',
    cell: (element: Product) => `${element.description}`,
  },
  {
    columnDef: 'price',
    header: 'Price',
    cell: (element: Product) => `${element.price}`,
  },
  {
    columnDef: 'add_in_cart',
    header: 'Add in cart',
    cell: (element) => `add_in_cart`,
  },
];

export const cartTableColumns = [
  {
    columnDef: 'productId',
    header: 'Product Id',
    cell: (element: Cart) => `${element.id}`,
  },
  {
    columnDef: 'name',
    header: 'Name',
    cell: (element: Cart) => `${element.title}`,
  },
  {
    columnDef: 'price',
    header: 'Price',
    cell: (element: Cart) => `${element.price}`,
  },
  {
    columnDef: 'quantity',
    header: 'Quantity',
    cell: (element: Cart) => `${element.quantity}`,
  },
  {
    columnDef: 'remove_from_cart',
    header: 'Remove from cart',
    cell: (element) => `remove_from_cart`,
  },
];
