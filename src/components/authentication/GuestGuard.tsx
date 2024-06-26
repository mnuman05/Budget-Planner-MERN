import useAuth from "hooks/useAuth";
import React, { Fragment, ReactNode } from "react";
import { Navigate } from "react-router-dom";


interface GuestGuardProps {
  children: ReactNode;
}
const GuestGuard = ({ children }: GuestGuardProps) => {

    const { isAuthenticated } = useAuth();
    
    if (isAuthenticated) {
      return <Navigate to="/dashboard" />;
    }

  return <Fragment>{children}</Fragment>;
};

export default GuestGuard;
