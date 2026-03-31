import { render, screen } from '@testing-library/react';
import Button from './Button';
import { BookStoreThemeProvider } from '../../context/themeContext';

describe('Button', () => {
  it('렌더를 확인', () => {
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          버튼
        </Button>
      </BookStoreThemeProvider>,
    );
    expect(screen.getByText('Button 작동 확인중')).toBeInTheDocument();
  });
});
