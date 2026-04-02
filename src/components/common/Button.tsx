import React from 'react';
import { ButtonScheme, ButtonSize } from '../../style/theme';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme;
  disabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  type?: string | 'submit';
}

const Button = ({
  children,
  size,
  scheme,
  disabled,
  isLoading,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonStyle
      size={size}
      scheme={scheme}
      disabled={disabled}
      isLoading={isLoading}
      onClick={onClick}
    >
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<Omit<ButtonProps, 'children'>>`
  font-size: ${({ theme, size }) => theme.button[size].fontSize};
  padding: ${({ theme, size }) => theme.button[size].padding};
  color: ${({ theme, scheme }) => theme.buttonScheme[scheme].color};
  background-color: ${({ theme, scheme }) =>
    theme.buttonScheme[scheme].backgroundColor};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled, isLoading }) =>
    disabled || isLoading ? 'none' : 'auto'};
  cursor: ${({ disabled, isLoading }) =>
    disabled || isLoading ? 'not-allowed' : 'pointer'};
`;

export default Button;
