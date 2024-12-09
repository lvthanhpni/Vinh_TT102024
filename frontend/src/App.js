import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Individual from './components/Individual';
import Organization from './components/Organization';
import VLXD from './components/VLXD';
import AuthProvider from './context/AuthProvider';
import CreatePost from './components/Create_post';
import ViewPost from './components/View_post';
import DetailPost from './components/Detail_post';
import DetailLibrary from './components/Detail_library';



const App = () => {
  const [data, setData] = useState(null);

  // Fetch data from Django backend
  useEffect(() => {
    fetch("http://localhost:8000/api/sample-data/")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (

    <div className="App">



      <AuthProvider>
        <Router>
          <Header />

          <Routes>
            <Route path="/" element={<Base />} />
            <Route path="/EOB" element={<Homepage />} />
            <Route path="/EOB/Carousel" element={<Carousel />} />
            <Route path="/EOB/Folder" element={<Folder />} />
            <Route path="/EOB/Library" element={<Library />} />
            <Route path="/EOB/Library/:id" element={<DetailLibrary />} />

            {/* Login routes */}
            <Route path="/EOB/Member" element={<SignupMem />} />
            <Route path="/EOB/VLXD" element={<SignupVLXD />} />
            <Route path="/EOB/Login" element={<Login />} />
            <Route path="/EOB/Profile" element={<Profile />} />
            <Route path="/EOB/Forget" element={<ForgetPass />} />
            <Route path="/Organization" element={<Organization />} />
            <Route path="/VLXD" element={<VLXD />} />

            <Route path="/EOB/Post" element={< ViewPost />} />
            <Route path="/EOB/Post/:id" element={<DetailPost />} />
            <Route path="/EOB/Post/Create" element={< CreatePost />} />

            {/* New Route to Display Fetched Data */}
            <Route
              path="/EOB/fetch-data"
              element={
                <div>
                  <h1>Data from Django:</h1>
                  {data ? (
                    <div>
                      <p>Message: {data.message}</p>
                      <p>Status: {data.status}</p>
                    </div>
                  ) : (
                    <p>Loading data...</p>
                  )}
                </div>
              }
            />
          </Routes>

          <Footer />
        </Router >
      </AuthProvider>




    </div >


  );
};

export default App;
