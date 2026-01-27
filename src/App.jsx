import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/home/Home"; // 폴더명 'home' 확인

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* 나중에 여기에 스터디 만들기 페이지 추가 */}
      </Routes>
    </Layout>
  );
}

export default App;