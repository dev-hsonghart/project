import React from 'react';
import { useRouteError } from 'react-router-dom';

interface RouterError {
  statusText?: string;
  message?: string;
}

const Error = () => {
  const error = useRouteError() as RouterError;
  return (
    <div>
      <h1>오류가 떴습니다 선생님</h1>
      <p>다음과 같은 오류가 발생했습니다.</p>
      {error.statusText && <p>{error.statusText}</p>}
      {error.message && <p>{error.message}</p>}
    </div>
  );
};

export default Error;
