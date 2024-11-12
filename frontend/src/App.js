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
import SignupMem from './components/Signup_mem';
import SignupVLXD from './components/Signup_VLXD';
import ForgetPass from './components/Forget_pass';
import Login from './components/Login';
import Profile from './components/Profile';

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

          {/* Login route */}
          <Route path="/EOB/Member" element={<SignupMem />} />
          <Route path="/EOB/VLXD" element={<SignupVLXD />} />
          <Route path="/EOB/Login" element={<Login />} />
          <Route path="/EOB/Profile" element={<Profile />} />
          <Route path="/EOB/Forget" element={<ForgetPass />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
