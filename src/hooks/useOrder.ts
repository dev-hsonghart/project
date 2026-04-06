import { useEffect, useState } from 'react';
import { Order } from '../models/order.model';
import { fetchOrder, fetchOrders } from '../api/order.api';
import { OrderListItem } from '../models/order.model';

export const useOrder = () => {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders().then((data) => {
      setOrders(data);
    });
  }, []);

  const selectOrderItem = (orderId: number) => {
    if (orders.filter((item) => item.orderId === orderId)[0].detail) {
      return;
    }

    fetchOrder(orderId).then((data) => {
      setSelectedItemId(orderId);
      setOrders((prevOrders) =>
        prevOrders.map((item) => {
          if (item.orderId === orderId) {
            // 일치하는 아이템을 찾으면 기존 데이터에 detail을 추가해서 반환
            return {
              ...item,
              detail: data.detail,
            };
          }
          // 일치하지 않는 아이템은 그대로 유지
          return item;
        }),
      );
    });
  };

  return { orders, selectedItemId, selectOrderItem };
};
