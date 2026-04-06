import { data, Navigate, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../components/common/Title';
import { CartStyle } from './Cart';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import { useForm } from 'react-hook-form';

import { Delivery, OrderSheet } from '../models/order.model';
import FindAddressButton from '../components/order/FindAddressButton';
import { order } from '../api/order.api';
import { showAlert } from '../utils/alerts';
import { useAlert } from '../hooks/useAlert';

interface DeliveryForm extends Delivery {
  detailAddress: string;
}

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showConfirm } = useAlert();
  const orderDataFromCart = location.state;
  const { totalQuantity, totalPrice, firstBookTitle } = orderDataFromCart;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DeliveryForm>();

  const handlePay = (data: DeliveryForm) => {
    const orderdata: OrderSheet = {
      ...orderDataFromCart,
      delivery: {
        ...data,
        address: `${data.address} ${data.detailAddress}`,
      },
    };

    showConfirm('주문을 진행하시겠습니까?', () => {
      order(orderdata).then(() => {
        showAlert('주문이 완료되었습니다.');
        navigate('/orders');
      });
    });
  };

  return (
    <>
      <Title size="large" color="primary">
        주문서
      </Title>
      <CartStyle>
        <div className="content">
          <div className="order-info">
            <Title size="medium" color="text">
              배송 정보
            </Title>
            <form className="delivery">
              <fieldset>
                <label>주소</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register('address', { required: true })}
                  />
                </div>
                <FindAddressButton
                  onCompleted={(address) => {
                    setValue('address', address);
                  }}
                />
              </fieldset>
              {errors.address && <p className="error">주소를 입력해주세요.</p>}

              <fieldset>
                <label>상세 주소</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register('detailAddress', { required: true })}
                  />
                </div>
              </fieldset>
              {errors.detailAddress && (
                <p className="error">상세 주소를 입력해주세요.</p>
              )}
              <fieldset>
                <label>수령인</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register('receiver', { required: true })}
                  />
                </div>
              </fieldset>
              {errors.receiver && (
                <p className="error">수령인을 입력해주세요.</p>
              )}
              <fieldset>
                <label>전화번호</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register('contact', { required: true })}
                  />
                </div>
              </fieldset>
              {errors.contact && (
                <p className="error">전화번호를 입력해주세요.</p>
              )}
            </form>
          </div>
          <div className="order-info">
            <Title size="medium" color="text">
              주문 상품
            </Title>
            <strong>
              {firstBookTitle} 등 총 {totalQuantity}권
            </strong>
          </div>
        </div>
        <div className="summary">
          <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
          <Button
            size="large"
            scheme="primary"
            onClick={handleSubmit(handlePay)}
          >
            결제하기
          </Button>
        </div>
      </CartStyle>
    </>
  );
};

const OrderStyle = styled.div``;

export default Order;
