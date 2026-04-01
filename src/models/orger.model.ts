export interface Order {
  orderId: number;
  createdAt: string;
  address: string;
  receiver: string;
  contact: string;
  bookTitle: string;
  totalPrice: number;
  totalCount: number;
}
