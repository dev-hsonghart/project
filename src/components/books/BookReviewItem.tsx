import { BookReviewItem as IBookReviewItem } from '@/models/book.model';
import { formatDate } from '@/utils/formmat';
import styled from 'styled-components';

interface Props {
  review: IBookReviewItem;
}

const Star = (props: Pick<IBookReviewItem, 'score'>) => {
  return (
    <span className="star">
      {Array.from({ length: props.score }, (_, index) => (
        <span key={index}>⭐</span>
      ))}
    </span>
  );
};

const BookReviewItem = ({ review }: Props) => {
  return (
    <BookReviewItemStyle>
      <header className="header">
        <div>
          <span>{review.userName}</span>
          <Star score={review.score} />
        </div>
        <div>{formatDate(review.createdAt)}</div>
      </header>
    </BookReviewItemStyle>
  );
};

const BookReviewItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.default};

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.087rem;
    color: ${({ theme }) => theme.color.secondary};
    padding: 0;
  }

  .content {
    p {
      font-size: 1rem;
      line-height: 1.5;
      margin: 0;
    }
  }
`;

export default BookReviewItem;
