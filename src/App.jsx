import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import NeighborhoodPage from './components/NeighborhoodPage';
import DormPage from './components/DormPage';
import AboutPage from './components/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/neighborhood/:neighborhoodId" element={<NeighborhoodPage />} />
        <Route path="/dorm/:dormId" element={<DormPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;