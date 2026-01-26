import React from "react";
import logo from "../assets/images/img_logo.svg"; 

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="공부의 숲 로고" style={{ height: "60px" }} />
          </a>
        </div>
        <button className="btn-signup">스터디 만들기</button>
      </div>
    </header>
  );
};

export default Header;