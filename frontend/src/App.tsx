import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EstimatorPage from './pages/EstimatorPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/estimator" element={<EstimatorPage />} />
    </Routes>
  );
}
