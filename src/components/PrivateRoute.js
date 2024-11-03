// src/components/PrivateRoute.js
import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;