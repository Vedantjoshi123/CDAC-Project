import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, getUser } from '../utils/authUtils';

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const token = getToken();
  const user = getUser();

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.userRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RoleBasedRoute;
