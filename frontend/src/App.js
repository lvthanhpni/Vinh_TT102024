import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Base from './components/Base';
import Homepage from './components/Homepage';
import Carousel from './components/Carousel';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />


        <Routes>
          <Route path="/" element={<Base />} />
          <Route path="/EOB" element={<Homepage />} />
          <Route path="/Carousel" element={<Carousel />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
