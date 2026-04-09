import React, { useState } from 'react';
import Title from '../components/common/Title';
import styled from 'styled-components';
import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login, signup } from '../api/auth.api';
import { SignupProps, SignupStyle } from './Signup';
import { showAlert } from '../utils/alerts';
import { useAuthStore } from '../store/authStore';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const { userLogin } = useAuth();
  const navigate = useNavigate();
  const { isLoggedIn, storeLogin, storeLogout } = useAuthStore();
  useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    userLogin(data);
  };

  return (
    <div>
      <Title size="large">로그인</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              //   value={email}
              inputType="email"
              placeholder="아이디를 입력하세요"
              {...register('email', { required: true })}
              inputMode="email"
            />
            {errors.email && <p className="error-text">이메일을 입력하세요.</p>}
          </fieldset>
          <fieldset>
            <InputText
              //   value={password}
              inputType="password"
              placeholder="비밀번호를 입력하세요"
              {...register('password', { required: true })}
              inputMode="text"
            />
            {errors.password && (
              <p className="error-text">비밀번호를 입력하세요.</p>
            )}
          </fieldset>

          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              로그인
            </Button>
          </fieldset>
          <div className="info">
            <Link to="/signup">회원가입</Link>
          </div>
        </form>
      </SignupStyle>
    </div>
  );
};

export default Login;
