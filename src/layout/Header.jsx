import '@/assets/styles/global.css';
import React from 'react';
import { useLocation, Link } from 'react-router';
import logo from '@/assets/images/img_logo.svg';

const Header = () => {
  const location = useLocation();

  const buttonShowUrl = ['/', '/study/create'];
  const urlCheck = buttonShowUrl.includes(location.pathname);

  return (
    <header>
      <div className="headerContainer">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="공부의 숲 로고" />
          </Link>
        </div>
        {urlCheck && (
          <Link to="/study/create" className="btnStudyCreate">
            스터디 만들기
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
