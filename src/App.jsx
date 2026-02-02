import { Routes, Route, Link } from 'react-router';
import '@/assets/styles/reset.css';
import Layout from './layout/Layout';
import Home from '@/pages/home/Home';
import Study from './pages/study/Study';
import { Create } from './pages/create';
import Habit from './pages/habit/habit';
import StudyAbout from './pages/studyAbout/StudyAbout';
import Focus from './pages/focus/Focus';
import StudyCreate from '@/pages/studyCreate/StudyCreate';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study/create" element={<StudyCreate />} />
        <Route path="/study/about" element={<StudyAbout />} />
        <Route path="/habit" element={<Habit />} />
        <Route path="/focus" element={<Focus />} />
      </Routes>
    </Layout>
  );
}

export default App;
