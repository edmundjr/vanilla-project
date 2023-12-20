import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Login from './Login';
import Form from './Form';
import ManageUsers from './ManageUsers';
import ViewDatabase from './ViewDatabase';
import "./App.css";

function App() {
  // Replace isLoggedIn with actual logic to check if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    // You might want to include additional logout logic here
  };

  return (
    <Router>
      {isLoggedIn && (
        <nav>
          <ul>
            <li>
              <Link to="/form">Form</Link>
            </li>
            <li>
              <Link to="/manage-users">Manage Users</Link>
            </li>
            <li>
              <Link to="/view-database">View Database</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      )}

      <Routes>
        <Route path="/login" element={!isLoggedIn ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/form" />} />
        <Route path="/form" element={isLoggedIn ? <Form /> : <Navigate to="/login" />} />
        <Route path="/manage-users" element={isLoggedIn ? <ManageUsers /> : <Navigate to="/login" />} />
        <Route path ="/view-database" element={isLoggedIn ? <ViewDatabase /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
