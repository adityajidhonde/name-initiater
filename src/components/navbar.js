// src/components/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './login';
import LogoutButton from './logout';
import Profile from './profile';
import './Navbar.css';
import logo from '../assets/logo00.jpg'

const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();
  const [showProfile, setShowProfile] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLinkClick = () => {
    setMenuActive(false);
  };

  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuActive((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/"><img src={logo} alt='Logo' /></Link>
      </div>
      <div className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        {menuActive ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`navbar-menu ${menuActive ? 'active' : ''}`}>
        <li>
          <NavLink to="/" onClick={handleLinkClick}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={handleLinkClick}>
            About
          </NavLink>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <NavLink to="/domain-ai" onClick={handleLinkClick}>
                Domain AI
              </NavLink>
            </li>
            <li>
              <NavLink to="/domain-status" onClick={handleLinkClick}>
                Domain Status
              </NavLink>
            </li>
            <li>
              <NavLink to="/surprisem" onClick={handleLinkClick}>
                SurpriseMe
              </NavLink>
            </li>
            <li>
              <NavLink to="/chatassistant" onClick={handleLinkClick}>
                ChatAssistant
              </NavLink>
            </li>
          </>
        )}
      </ul>
      <div className="navbar-actions">
        {!isAuthenticated && <LoginButton />}
        {isAuthenticated && (
          <div className="profile-section" ref={profileRef}>
            <img
              src={user.picture}
              alt={`${user.name}'s profile`}
              className="profile-icon"
              onClick={toggleProfile}
              aria-haspopup="true"
              aria-expanded={showProfile}
            />
            {showProfile && <Profile className="show" />}
            <LogoutButton />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;