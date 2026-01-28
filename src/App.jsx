import { Routes, Route, Link } from 'react-router';
import '@/assets/styles/reset.css';
import Layout from './layout/Layout';
import Home from '@/pages/home/Home';
import Habit from './pages/habit/habit';
import Study from './pages/study/Study';
import Focus from './pages/focus/Focus';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/habit" element={<Habit />} />
        <Route path="/study" element={<Study />} />
        <Route path="/focus" element={<Focus />} />
      </Routes>
    </Layout>
  );
}

export default App;