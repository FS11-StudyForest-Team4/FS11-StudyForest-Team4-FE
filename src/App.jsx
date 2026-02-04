import { Routes, Route, Link } from 'react-router';
import '@/assets/styles/reset.css';
import Layout from './layout/Layout';
import Home from '@/pages/home/Home';
import StudyCreate from './pages/studyCreate/StudyCreate';
import StudyAbout from './pages/studyAbout/StudyAbout';
import Habit from './pages/habit/habit';
import Focus from './pages/focus/Focus';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study/create" element={<StudyCreate />} />
        <Route path="/study/edit/:studyId" element={<StudyCreate />} />
        <Route path="/study/about/:studyId" element={<StudyAbout />} />
        <Route path="/study/habit" element={<Habit />} />
        <Route path="/study/focus" element={<Focus />} />
      </Routes>
    </Layout>
  );
}

export default App;
