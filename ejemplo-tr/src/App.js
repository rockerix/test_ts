import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import LoginComponent from './components/public/LoginComponent';
import PrivateRoute from './security/PrivateRoute';
import BalanceComponent from './components/private/BalanceComponent';
import DepositComponent from './components/private/DepositComponent';
import WithdrawComponent from './components/private/WithdrawComponent';
import ReEnterPINComponent from './components/private/ReEnterPINComponent';
import MainComponent from './components/private/MainComponent';
import HeaderComponent from './components/template/HeaderComponent';
import grafi from './assets/sticker_graf.png';
import mark from './assets/systems.png';

import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('t');
    sessionStorage.removeItem('i');
    sessionStorage.removeItem('banco');
    setIsLoggedIn(false);
  };

  return (
    
    <Router>
      <div>
        <HeaderComponent/>
        <div className="container-principal">
          <div className="principal-box">
          <Routes>
          <Route
              path="/"
              element={
                !isLoggedIn ? (
                  <LoginComponent onLoginSuccess={handleLoginSuccess} />
                ) : (
                  <MainComponent 
                    onLogout={() => {
                      handleLogout();
                    }} 
                  />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route
              path="/main"
              element={
                <PrivateRoute isAuthenticated={isLoggedIn}>
                  <MainComponent onLogout={handleLogout} />
                </PrivateRoute>
              }
            />

            <Route
              path="/balance"
              element={
                <PrivateRoute isAuthenticated={isLoggedIn}>
                  <BalanceComponent />
                </PrivateRoute>
              }
            />
            <Route
              path="/deposit"
              element={
                <PrivateRoute isAuthenticated={isLoggedIn}>
                  <DepositComponent />
                </PrivateRoute>
              }
            />
            <Route
              path="/withdraw"
              element={
                <PrivateRoute isAuthenticated={isLoggedIn}>
                  <WithdrawComponent />
                </PrivateRoute>
              }
            />
            <Route
              path="/change-pin"
              element={
                <PrivateRoute isAuthenticated={isLoggedIn}>
                  <ReEnterPINComponent />
                </PrivateRoute>
              }
            />
          </Routes>
          <br></br>
          </div>
          <div className='stamps'>
            <img src={grafi} alt="Overlay" className="overlay-image-sticker" />
            <img src={mark} alt="Overlay" className="overlay-image-mark" />
          </div>
          
        </div>
        
      </div>
    </Router>
  );
};

export default App;
