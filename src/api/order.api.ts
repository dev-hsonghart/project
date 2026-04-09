import { Order, OrderListItem, OrderSheet } from '../models/order.model';
import { httpClient, requestHandler } from './http';

export const order = async (orderData: OrderSheet) => {
  return await requestHandler('post', '/orders', orderData);
};

export const fetchOrders = async () => {
  return await requestHandler('get', '/orders');

  // const response = await httpClient.get<Order[]>('/orders');
  // return response.data;
};

export const fetchOrder = async (orderId: number) => {
  return await requestHandler('get', `/orders/${orderId}`);
};
