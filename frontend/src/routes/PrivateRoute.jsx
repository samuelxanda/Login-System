// // components/ProtectedRoute.jsx
// // import { Navigate } from "react-router-dom";

// import { Navigate } from "react-router-dom";

// // const ProtectedRoute = ({ children }) => {
// //   const isAuthenticated = !!localStorage.getItem("login_token");

// //   return isAuthenticated ? children : <Navigate to="/login" replace />;
// // };

// // export default ProtectedRoute;

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = !!localStorage.getItem("user__token");
//   return isAuthenticated ? children : <Navigate to="/login2" replace />;
// };

// export default ProtectedRoute;
import React from 'react'
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('user__token');
  return isAuthenticated ? children : <Navigate to="/login2" />
}