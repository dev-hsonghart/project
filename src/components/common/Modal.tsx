import { on } from 'events';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, onClose, isOpen }: ModalProps) => {
  if (!isOpen) return null;

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClose = () => {
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <>
      {isOpen && (
        <ModalStyle onClick={handleOverlayClick}>
          <div className="modal-body" ref={modalRef}>
            <div className="modal-content">{children}</div>
            <button className="modal-close" onClick={handleClose}>
              <span>X</span>
            </button>
          </div>
        </ModalStyle>
      )}
    </>
  );
};

const ModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  .modal-body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 56px 32px 32px;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

    max-width: 80%;
  }

  .modal-close {
    border: none;
    background-color: transparent;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    padding: 12px;
  }
`;

export default Modal;
