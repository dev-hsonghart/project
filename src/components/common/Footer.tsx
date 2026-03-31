import React from 'react';
import logo from '../../assets/images/img_logo.jpg';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterStyle>
      <img className="logo" src={logo} alt="Logo" />
      <hr />
      <footer>이것은 푸터입니다</footer>
    </FooterStyle>
  );
};

const FooterStyle = styled.footer`
  width: '100%';
  margin: 0 auto;
  maxwidth: '${({ theme }) => theme.layout.width.large}';
  border-top: 1px solid ${({ theme }) => theme.color.border};
  padding: '20px 0';
  textalign: 'center';
  display: flex;
  justify-content: space-between;
`;

export default Footer;
