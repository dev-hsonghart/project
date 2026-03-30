import React from 'react';
import Header from '../components/common/Header';
import { formatNumber } from '../utils/formmat';

const Home = () => {
  const COUNT = 10000;
  return (
    <>
      <div>book store</div>
      <div>count : {formatNumber(COUNT)}</div>
    </>
  );
};

export default Home;
