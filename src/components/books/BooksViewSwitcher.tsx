import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { useSearchParams } from 'react-router-dom';
import { QUERYSTRING } from '../../contants/querystring';

const viewOptions = [
  { value: 'list' as ViewMode, icon: '🗄️' },
  { value: 'grid' as ViewMode, icon: '🪟' },
];

export type ViewMode = 'list' | 'grid';

const BooksViewSwitcher = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSwitch = (value: ViewMode) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(QUERYSTRING.VIEW, value);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    if (!searchParams.get(QUERYSTRING.VIEW)) {
      handleSwitch('grid');
    }
  }, []);

  return (
    <BooksViewSwitcherStyle>
      {viewOptions.map((option) => (
        <Button
          key={option.value}
          size="small"
          scheme={
            searchParams.get(QUERYSTRING.VIEW) === option.value
              ? 'primary'
              : 'normal'
          }
          onClick={() => handleSwitch(option.value)}
        >
          {option.icon} {option.value}
        </Button>
      ))}
    </BooksViewSwitcherStyle>
  );
};

const BooksViewSwitcherStyle = styled.div`
  display: flex;
  gap: 8px;
`;

export default BooksViewSwitcher;
