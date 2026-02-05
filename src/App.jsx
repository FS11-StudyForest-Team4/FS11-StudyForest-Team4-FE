import { Routes, Route, Link } from 'react-router';
import '@/assets/styles/reset.css';
import Layout from './layout/Layout';
import Home from '@/pages/home/Home';
import StudyCreate from './pages/studyCreate/StudyCreate';
import StudyAbout from './pages/studyAbout/StudyAbout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study/create" element={<StudyCreate />} />
        <Route path="/study/edit/:studyId" element={<StudyCreate />} />
        <Route path="/study/about/:studyId" element={<StudyAbout />} />
      </Routes>
    </Layout>
  );
}

export default App;
