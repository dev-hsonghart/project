import React, { useState } from 'react';
import Title from '../components/common/Title';
import styled from 'styled-components';
import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';

export interface SignupProps {
  email: string;
  password: string;
  name?: string;
}

const Signup = () => {
  const { userSignup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    userSignup(data);
  };

  return (
    <div>
      <Title size="large">회원가입</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              //   value={email}
              inputType="email"
              placeholder="아이디를 입력하세요"
              {...register('email', { required: true })}
              //   onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error-text">이메일을 입력하세요.</p>}
          </fieldset>
          <fieldset>
            <InputText
              //   value={password}
              inputType="password"
              placeholder="비밀번호를 입력하세요"
              {...register('password', { required: true })}
              //   onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="error-text">비밀번호를 입력하세요.</p>
            )}
          </fieldset>
          <fieldset>
            <InputText
              inputType="name"
              placeholder="사용자 이름을 입력하세요"
              {...register('name', { required: true })}
            />
            {errors.name && <p className="error-text">이름을 입력하세요.</p>}
          </fieldset>
          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              회원가입
            </Button>
          </fieldset>
          <div className="info">
            <Link to="/reset">비밀번호 초기화</Link>
          </div>
        </form>
      </SignupStyle>
    </div>
  );
};

export const SignupStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;

  fieldset {
    border: 0;
    padding: 0 0 8px 0;
    .error-text {
      color: red;
    }
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }

  .info {
    text-align: center;
    padding: 16px 0 0 0;
  }
`;

export default Signup;
