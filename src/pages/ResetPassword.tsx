import React, { useState } from 'react';
import Title from '../components/common/Title';
import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { resetPassword, resetPasswordRequest, signup } from '../api/auth.api';
import { SignupStyle } from './Signup';
import { showAlert } from '../utils/alerts';
import { SignupProps } from './Signup';

const ResetPassword = () => {
  const navigate = useNavigate();

  const [resetRequest, setResetRequest] = useState<Boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    if (resetRequest) {
      resetPassword(data).then(() => {
        showAlert('비밀번호가 초기화 되었습니다.');
        navigate('/login');
      });
      // 초기화 실행
    } else {
      // 초기화 요청
      resetPasswordRequest(data).then(() => {
        setResetRequest(true);
      });
    }
  };

  return (
    <div>
      <Title size="large">비밀번호 초기화</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              inputType="email"
              placeholder="아이디를 입력하세요"
              {...register('email', { required: true })}
            />
            {errors.email && <p className="error-text">이메일을 입력하세요.</p>}
          </fieldset>

          {resetRequest && (
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
          )}

          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              {resetRequest ? '비밀번호 초기화' : '초기화 요청'}
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

export default ResetPassword;
