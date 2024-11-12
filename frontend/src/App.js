import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Base from './components/Base';
import Homepage from './components/Homepage';
import Carousel from './components/Carousel';
import Header from './components/Header';
import Footer from './components/Footer';
import Folder from './components/Folder';
import Library from './components/Library';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />


        <Routes>
          <Route path="/" element={<Base />} />
          <Route path="/EOB" element={<Homepage />} />
          <Route path="/EOB/Carousel" element={<Carousel />} />
          <Route path="/EOB/Folder" element={<Folder />} />
          <Route path="/EOB/Library" element={<Library />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
