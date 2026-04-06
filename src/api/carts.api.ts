import { Cart } from '../models/cart.model';
import { httpClient } from './http';

interface AddCartParams {
  bookId: number;
  count: number;
}

export const addCart = async (params: AddCartParams) => {
  const response = await httpClient.post('/cart', params);
  return response.data;
};

export const fetchCart = async () => {
  const response = await httpClient.get<Cart[]>('/cart');
  return response.data;
};

export const deleteCart = async (cartItemId: number) => {
  const response = await httpClient.delete(`/cart/${cartItemId}`);
  return response.data;
};
