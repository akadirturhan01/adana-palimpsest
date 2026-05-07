import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Methodology from './pages/Methodology';
import MapSimulation from './pages/MapSimulation';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<Methodology />} />
      <Route path="/simulation" element={<MapSimulation />} />
    </Routes>
  );
}

export default App;
