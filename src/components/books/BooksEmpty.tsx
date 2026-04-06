import { Link } from 'react-router-dom';
import { FaSmileWink } from 'react-icons/fa';
import Empty from '../common/Empty';

const BooksEmpty = () => {
  return (
    <Empty
      icon={
        /* @ts-ignore */
        <FaSmileWink />
      }
      title="검색 결과가 없어요."
      description={<Link to="/books">전체 검색 결과로 이동</Link>}
    />
  );
};

export default BooksEmpty;
