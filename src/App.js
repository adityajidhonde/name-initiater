import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/PrivateRoute';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import DomainAI from './pages/domainaI';
import DomainStatus from './pages/domainstatus';
import SurpriseMe from './pages/surpriseme';
import ChatAssistant from './pages/chatassistant';
import About from './pages/about';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

const App = () => {
  const { user, isAuthenticated } = useAuth0();

  // Only pass userId if the user is authenticated
  const userId = isAuthenticated ? user?.sub : null;
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            {/* Protected Routes */}
            <Route path="/domain-ai" element={<PrivateRoute element={<DomainAI userId={userId} />} />} />            
            <Route path="/domain-status" element={<PrivateRoute element={<DomainStatus/>} />} />
            <Route path="/surprisem" element={<PrivateRoute element={<SurpriseMe/>} />} />
            <Route path="/chatassistant" element={<PrivateRoute element={<ChatAssistant/>} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
