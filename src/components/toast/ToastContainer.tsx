import React, { useEffect } from 'react';
import styled from 'styled-components';
import Toast from './Toast';
import useToastStore from '@/store/toastStore';

const ToastContainer = () => {
  return (
    <ToastContainerStyle>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
        />
      ))}
    </ToastContainerStyle>
  );
};

const ToastContainerStyle = styled.div`
  position: fixed;
  top: 32px;
  right: 24px;
  z-index: 9999;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default ToastContainer;
