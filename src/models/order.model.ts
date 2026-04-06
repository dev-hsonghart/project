export interface Order {
  orderId: number;
  createdAt: string;
  delivery: {
    address: string;
    receiver: string;
    contact: string;
  };
  bookTitle: string;
  totalPrice: number;
  totalCount: number;
}

export interface OrderSheet {
  cartItems: number[];
  totalCount: number;
  totalPrice: number;
  mainBookTitle: string;
  delivery: {
    address: string;
    receiver: string;
    contact: string;
  };
}

export interface Delivery {
  address: string;
  receiver: string;
  contact: string;
}

export interface OrderDetail {
  bookId: number;
  bookTitle: string;
  author: string;
  price: number;
  count: number;
}

export interface OrderListItem extends Order {
  detail?: OrderDetail[];
}
