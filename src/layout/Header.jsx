import React from "react";
import { useLocation, Link } from "react-router-dom"; 
import logo from "@/assets/images/img_logo.svg"; 

const Header = () => {
  const location = useLocation();

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo">

          <Link to="/">
            <img src={logo} alt="공부의 숲 로고" style={{ height: "60px" }} />
          </Link>
        </div>

        {location.pathname === "/" || location.pathname.includes("/study") ? (
          <Link to="/study/create" className="btn-signup">
            스터디 만들기
          </Link>
        ) : null}
      </div>
    </header>
  );
};

export default Header;