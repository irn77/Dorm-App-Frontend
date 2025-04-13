import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import NeighborhoodPage from './components/NeighborhoodPage';
import DormPage from './components/DormPage';
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';
import DirectoryPage from './components/DirectoryPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import './index.css'; // ✅ loads variables globally

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/neighborhood/:neighborhoodId" element={<NeighborhoodPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/directory" element={<DirectoryPage />} />
        <Route path="/contact" element={<ContactPage />} /> {}
        <Route path="/:slug" element={<DormPage />} />
        <Route path="*" element={<NotFoundPage />} /> {}
      </Routes>
      <Footer />

    </BrowserRouter>
  );
}

export default App;