import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

interface Props {
  onCompleted: (address: string) => void;
}

const SCRIPT_URL =
  '//t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const FindAddressButton = ({ onCompleted }: Props) => {
  const handleOpen = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        const fullAddress = data.address;
        onCompleted(fullAddress);
      },
    }).open();
  };

  useEffect(() => {
    const script = document.createElement('script'); // script 태그 만들기
    script.src = SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Button type="button" size="medium" scheme="normal" onClick={handleOpen}>
      주소 찾기
    </Button>
  );
};

const FindAddressButtonStyle = styled.button``;

export default FindAddressButton;
