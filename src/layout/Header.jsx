import '@/assets/styles/global.css';
import React from 'react';
import { useLocation, Link } from 'react-router';
import logo from '@/assets/images/img_logo.svg';

const Header = () => {
  const location = useLocation();

  const shouldShowCreateButton =
    location.pathname === '/' || location.pathname.startsWith('/study');

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="공부의 숲 로고" />
          </Link>
        </div>
        {shouldShowCreateButton && (
          <Link to="/study/create" className="btn-study-create">
            스터디 만들기
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
