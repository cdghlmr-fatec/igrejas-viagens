// src/components/Admin.jsx
import React from 'react';

const Admin = ({ token }) => {
  return (
    <div>
      <h1>Admin Page</h1>
      <p>Your JWT token: {token}</p>
      {/* Aqui você pode adicionar mais funcionalidades para o admin */}
    </div>
  );
};

export default Admin;
