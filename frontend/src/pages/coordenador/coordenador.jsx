import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './coordenador.css';

export function Coordenador() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o token de autenticação está presente no localStorage
    const token = localStorage.getItem('token');
    const roles = JSON.parse(localStorage.getItem('roles'));  // Recuperar as roles do localStorage

    if (!token || !roles) {
      // Se não houver token ou roles, redireciona para a página de login
      navigate('/login');
    } else {
      // Verificar se o usuário tem a role de admin
      if (!roles.includes('coordenador')) {
        // Se o usuário não tem a role de admin, redireciona para o login
        navigate('/login');
      } else {
        // Caso o usuário tenha a role de admin, buscar os dados do usuário
        fetchUserData(token);
      }
    }
  }, [navigate]);

  // Função para buscar dados do usuário (simulada aqui)
  const fetchUserData = async (token) => {
    // Aqui você pode fazer uma requisição à sua API para pegar dados reais
    // Por enquanto, vamos simular uma resposta
    setUser({
      username: 'ceci', // Substituir por dados reais da API
      email: 'ceci@exemplo.com',
    });
  };

  // Função para logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remover o token do localStorage
    localStorage.removeItem('roles'); // Remover as roles do localStorage
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <div className="dashboard-container">
      <h1>Bem-vindo à Coordenação!</h1>

      {user ? (
        <div className="user-info">
          <p><strong>Nome:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Carregando informações do usuário...</p>
      )}

      <button className="btn btn-danger" onClick={handleLogout}>Sair</button>
    </div>
  );
}
