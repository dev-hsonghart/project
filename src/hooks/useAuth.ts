import { SignupProps } from '@/pages/Signup';
import { useAuthStore } from '@/store/authStore';
import {
  login,
  resetPassword,
  resetPasswordRequest,
  signup,
} from '../api/auth.api';
import { showAlert } from '@/utils/alerts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const useAuth = () => {
  const { storeLogin, storeLogout, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const userLogin = (data: SignupProps) => {
    login(data)
      .then((res) => {
        // 상태변화
        storeLogin(res.token);
        // 로컬스토리지에 토큰 저장
        showAlert('로그인이 완료되었습니다.');
        navigate('/');
      })
      .catch((error) => {
        showAlert('로그인에 실패했습니다');
      });
  };

  const userSignup = (data: SignupProps) => {
    signup(data)
      .then((res) => {
        showAlert('회원가입이 완료되었습니다.');
        navigate('/login');
      })
      .catch((error) => {
        showAlert('회원가입에 실패했습니다.');
      });
  };

  const [resetRequest, setResetRequest] = useState<Boolean>(false);

  const userResetRequest = (data: SignupProps) => {
    resetPasswordRequest(data).then(() => {
      setResetRequest(true);
    });
  };

  const userResetPassword = (data: SignupProps) => {
    resetPassword(data).then(() => {
      showAlert('비밀번호가 초기화 되었습니다.');
      navigate('/login');
    });
  };

  return {
    userLogin,
    storeLogout,
    isLoggedIn,
    userSignup,
    userResetPassword,
    userResetRequest,
    resetRequest,
  };
};
