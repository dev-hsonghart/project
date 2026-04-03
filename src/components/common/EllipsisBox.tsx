import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

interface Props {
  children: React.ReactNode;
  lineLimit: number;
}

const EllipsisBox = ({ children, lineLimit }: Props) => {
  const [expended, setExpanded] = useState(false);
  return (
    <EllipsisBoxStyle lineLimit={lineLimit} $expended={expended}>
      <p>{children}</p>
      <div className="toggle">
        <Button
          size="small"
          scheme="normal"
          onClick={() => setExpanded(!expended)}
        >
          {expended ? '접기' : '펼치기'}
        </Button>
      </div>
    </EllipsisBoxStyle>
  );
};

interface EllipsisBoxStyleProps {
  lineLimit?: number;
  $expended: boolean;
}

const EllipsisBoxStyle = styled.div<EllipsisBoxStyleProps>`
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${({ lineLimit, $expended }) =>
      $expended ? 'none' : lineLimit};
    -webkit-box-orient: vertical;
    padding: 20px 0;
    margin: 0;
  }

  .toggle {
    display: flex;
    justify-content: end;
    margin-top: 8px;
  }
`;

export default EllipsisBox;
