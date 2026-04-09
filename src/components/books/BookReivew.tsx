import { BookReviewItem as IBookReviewItem } from '@/models/book.model';
import styled from 'styled-components';
import BookReviewItem from './BookReviewItem';

interface Props {
  reviews: IBookReviewItem[];
}

const BookReivew = ({ reviews }: Props) => {
  return (
    <BookReviewStyle>
      {reviews.map((review, index) => (
        <BookReviewItem key={index} review={review} />
      ))}
    </BookReviewStyle>
  );
};

const BookReviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default BookReivew;
