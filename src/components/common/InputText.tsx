import React from 'react';
import styled from 'styled-components';

interface Props {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = React.forwardRef<HTMLInputElement, Props>(
  ({ placeholder, value, onChange }, ref) => {
    return (
      <InputTextStyle
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  },
);

const InputTextStyle = styled.input.attrs({ type: 'text' })`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text};
`;

export default InputText;
