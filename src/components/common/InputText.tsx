import React from 'react';
import styled from 'styled-components';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  inputType?: 'text' | 'email' | 'password' | 'number' | 'name';
}

const InputText = React.forwardRef<HTMLInputElement, Props>(
  ({ inputType, ...props }, ref) => {
    return <InputTextStyle ref={ref} type={inputType} {...props} />;
  },
);

const InputTextStyle = styled.input`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text};
`;

export default InputText;
