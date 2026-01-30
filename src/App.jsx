import { Routes, Route, Link } from 'react-router';
import '@/assets/styles/reset.css';
import Layout from './layout/Layout';
import Home from '@/pages/home/Home';
import Habit from './pages/habit/Habit';
import Study from './pages/study/Study';
import { Create } from './pages/create';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/habit" element={<Habit />} />
        <Route path="/study" element={<Study />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Layout>
  );
}

export default App;
