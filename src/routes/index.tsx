import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Measurements from '../pages/Measurements';
import Tailors from '../pages/Tailors';
import Login from '../pages/Login';
import Register from '../pages/Register';
import About from '../pages/About';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/measurements" element={<Measurements />} />
      <Route path="/tailors" element={<Tailors />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default AppRoutes;