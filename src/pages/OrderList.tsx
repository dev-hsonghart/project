import React from 'react';
import styled from 'styled-components';
import Title from '../components/common/Title';
import { useOrder } from '../hooks/useOrder';
import Button from '../components/common/Button';
import { formatNumber } from '../utils/formmat';

const OrderList = () => {
  const { orders, selectedItemId, selectOrderItem } = useOrder();

  return (
    <div>
      <Title size="large">주문 내역</Title>
      <OrderListStyle>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>주문일자</th>
              <th>주소</th>
              <th>수령인</th>
              <th>전화번호</th>
              <th>대표상품명</th>
              <th>수량</th>
              <th>금액</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.orderId}>
                <tr>
                  <td>{order.orderId}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.delivery.address}</td>
                  <td>{order.delivery.receiver}</td>
                  <td>{order.delivery.contact}</td>
                  <td>{order.bookTitle}</td>
                  <td>{order.totalCount}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    <Button
                      size="small"
                      scheme="normal"
                      onClick={() => selectOrderItem(order.orderId)}
                    >
                      자세히
                    </Button>
                  </td>
                </tr>

                {selectedItemId === order.orderId && (
                  <tr>
                    <td></td>
                    <td colSpan={8}>
                      <ul>
                        {order?.detail &&
                          order.detail.map((item) => (
                            <li key={item.bookId}>
                              <div>
                                <span>{item.bookId}</span>
                                <span>{item.author}</span>
                                <span>{formatNumber(item.price)}원</span>
                                <span>{item.count}권</span>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </OrderListStyle>
    </div>
  );
};

const OrderListStyle = styled.div`
  padding: 24px;

  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid ${(props) => props.theme.color.border};
    border-bottom: 1px solid ${(props) => props.theme.color.border};

    th,
    td {
      padding: 16px;
      text-align: left;
      border-bottom: 1px solid ${(props) => props.theme.color.border};
    }

    thead {
      background-color: ${(props) => props.theme.color.background};
    }
  }

  .detail {
    margin: 0;
    li {
      list-style: square;
      text-align: left;
      div {
        display: flex;
        padding: 8px 12px;
        gap: 8px;
      }
    }
  }
`;

export default OrderList;
