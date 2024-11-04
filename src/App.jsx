// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import MainLayout from './components/layout/MainLayout';

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          {/* Thêm các route khác khi cần */}
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
