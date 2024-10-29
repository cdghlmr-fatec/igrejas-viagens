import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Public from './components/Public';
import Login from './components/Login';
import Signup from './components/Signup';
import User from './components/User';
import Admin from './components/Admin';
import Moderator from './components/Moderator';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ children, roles }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;

  const decodedToken = jwtDecode(token);
  const userRoles = decodedToken.roles; // Acessa a propriedade roles

  if (roles && !roles.some(role => userRoles.includes(role))) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Public />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/user"
          element={
            <PrivateRoute roles={['ROLE_USER', 'ROLE_ADMIN', 'ROLE_MODERATOR']}>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute roles={['ROLE_ADMIN']}>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="/moderator"
          element={
            <PrivateRoute roles={['ROLE_MODERATOR']}>
              <Moderator />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
