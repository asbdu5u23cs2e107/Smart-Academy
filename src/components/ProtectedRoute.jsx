import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Fixed path - removed the 's'

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login but save the location they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole) {
    const roleHierarchy = {
      admin: ['admin', 'super_admin'],
      super_admin: ['super_admin']
    };

    const allowedRoles = roleHierarchy[requiredRole] || [];
    // Check multiple possible paths for user role
    const userRole = user?.role || user?.userType || user?.user?.role || user?.user?.userType;
    
    if (!allowedRoles.includes(userRole)) {
      // Redirect to student dashboard if not authorized
      return <Navigate to="/student-dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;