import React from 'react';
import Header from '../components/common/Header';
import { formatNumber } from '../utils/formmat';
import Title from '../components/common/Title';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';

const Home = () => {
  return (
    <>
      <Title size="large" color="primary">
        Book Store
      </Title>
      <Button size="medium" scheme="primary" disabled={false} isLoading={false}>
        버튼 테스트
      </Button>
      <InputText
        placeholder="검색어를 입력하세요"
        value=""
        onChange={() => {}}
      />
    </>
  );
};

export default Home;
