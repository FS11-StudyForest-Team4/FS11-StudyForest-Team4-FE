import React from 'react';
import Header from './Header';
import "@/assets/styles/global.css"; // 이 부분에 헤더 CSS가 포함되어 있어야 합니다!

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header /> 
      <main className="content-area"> {/* 클래스명을 주어 스타일링하기 편하게 합니다 */}
        {children}
      </main>
    </div>
  );
};

export default Layout;