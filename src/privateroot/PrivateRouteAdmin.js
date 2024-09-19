import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from "../context/AuthProvider";
const PrivateRouteAdmin = () => {
    const user = useAuth();
  const [redirectTo, setRedirectTo] = useState(null);
  const IDparseInt = parseInt(localStorage.getItem("auth_id"));

 

  useEffect(() => {
    const checkAccess = async () => {
      if (user.token !== null) {
        if (IDparseInt !== 8) {
            setRedirectTo('/login');
        }
      } else {
        <Outlet />
      }
    };

    checkAccess();
  }, [user.token, IDparseInt]);

  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  return (user.token !== null && IDparseInt === 8) ? <Outlet /> : null;
};

export default PrivateRouteAdmin;
