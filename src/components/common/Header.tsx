import React from 'react';
import { styled } from 'styled-components';
import logo from '../../assets/images/img_logo.jpg';

const CATEGORY = [
  {
    id: null,
    name: '전체',
  },
  { id: 1, name: '소설' },
  { id: 2, name: '사회' },
];

const Header = () => {
  return (
    <HeaderStyle>
      <img className="logo" src={logo} alt="Logo" />
      <nav className="category">
        <ul>
          {CATEGORY.map((category) => (
            <li key={category.id}>
              <a
                href={
                  category.id === null
                    ? '/books'
                    : `/books?category_id=${category.id}`
                }
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="auth">
        <ul>
          <li>
            <a href="/login">로그인</a>
          </li>
          <li>
            <a href="/signup">회원가입</a>
          </li>
        </ul>
      </nav>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px 0;
  border-radius: 1px solid ${({ theme }) => theme.color.border};

  .logo {
    img {
      width: 50px;
      height: 10px;
    }
  }

  .category {
    ul {
      display: flex;
      gap: 20px;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({ theme }) => theme.color.text};
          &:hover {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
    }
  }

  .auth {
    ul {
      display: flex;
      gap: 20px;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({ theme }) => theme.color.text};
          &:hover {
            color: ${({ theme }) => theme.color.primary};
          }
          display: flex;
          align-items: center;
          line-height: 1;
        }
      }
    }
  }
`;

export default Header;
