import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router, Routes, and Route
import './App.css';
import BsState from './Context/BsState';
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import Movies from './Pages/Movies'; // Import Movies page component
// import Bookings from './Pages/Bookings'; // Import Bookings page component

function App() {
  return (
    <BsState>
      <Router>
        <div className="App">
          {/* Define Routes */}
          <Routes>
          {/* <Route path="/" element={<Auth />} /> */}
            <Route path="/" element={<Home />} /> {/* Home page */}
            <Route path="/movies" element={<Movies />} /> {/* Movies page */}
            {/* <Route path="/bookings" element={<Bookings />} /> My Bookings page */}
          </Routes>
        </div>
      </Router>
    </BsState>
  );
}

export default App;
