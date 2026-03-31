import { render, screen } from '@testing-library/react';
import Title from './Title';

describe('Title', () => {
  it('렌더를 확인', () => {
    render(
      <Title size="large" color="primary">
        Test Title
      </Title>,
    );
    expect(screen.getByText('Title 작동 확인중')).toBeInTheDocument();
  });
});
