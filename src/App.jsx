import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import NeighborhoodPage from './components/NeighborhoodPage';
import DormPage from './components/DormPage';
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';
import DirectoryPage from './components/DirectoryPage';
import ContactPage from './components/ContactPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/neighborhood/:neighborhoodId" element={<NeighborhoodPage />} />
        <Route path="/dorm/:dormId" element={<DormPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/directory" element={<DirectoryPage />} />
        <Route path="/contact" element={<ContactPage />} /> {}
        <Route path="*" element={<NotFoundPage />} /> {}
      </Routes>
    </BrowserRouter>
  );
}

export default App;