import React from 'react';

function Admin() {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user || !user.roles.includes('ROLE_ADMIN')) {
    return <h2>Acesso negado. Apenas administradores podem ver esta página.</h2>;
  }

  return <h2>Página do Admin: Acessível somente para administradores</h2>;
}

export default Admin;
