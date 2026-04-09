import { useTimeout } from '@/hooks/userTimeout';
import useToastStore, { ToastItem } from '@/store/toastStore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const TOAST_REMOVE_DELAY = 3000;

const Toast = ({ id, message, type }: ToastItem) => {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const handleRemoveToast = () => {
    removeToast(id);
    setIsFadingOut(true);
  };
  const handleAnimationEnd = () => {
    if (isFadingOut) {
      removeToast(id);
    }
  };

  useTimeout(() => {
    setIsFadingOut(true);
  }, TOAST_REMOVE_DELAY);

  return (
    <ToastStyle
      className={` ${isFadingOut ? 'fade-out' : 'fade-in'}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <p>
        {type === 'info' ? <span>ℹ️</span> : <span>🚨</span>}
        {message}
      </p>
      <button onClick={handleRemoveToast}>
        <span>X</span>
      </button>
    </ToastStyle>
  );
};

const ToastStyle = styled.div`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  &.fade-in {
    animation: fade-in 0.3s ease-out forwards;
  }

  &.fade-out {
    animation: fade-out 0.3s ease-out forwards;
  }

  background-color: ${({ theme }) => theme.color.background};
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.default};

  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 24px;

  p {
    color: ${({ theme }) => theme.color.text};
    line-height: 1;
    margin: 0;
    flex: 1;

    display: flex;
    align-items: end;
    gap: 4px;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }
`;

export default Toast;
