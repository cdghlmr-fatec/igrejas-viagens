import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './secretaria.css';

export function Secretaria() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o token de autenticação está presente no localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // Se não houver token, redireciona para a página de login
      navigate('/login');
    } else {
      // Caso haja um token, tentar buscar os dados do usuário (isso é opcional)
      fetchUserData(token);
    }
  }, [navigate]);

  // Função para buscar dados do usuário (simulada aqui)
  const fetchUserData = async (token) => {
    // Você pode fazer uma requisição para a API para pegar os dados do usuário aqui
    // Por enquanto, vamos simular uma resposta.
    setUser({
      username: 'ceci', // Aqui você pode substituir por dados reais da API
      email: 'ceci@exemplo.com',
    });
  };

  // Função para logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remover o token do localStorage
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <div className="dashboard-container">
      <h1>Bem-vindo a Secretaria</h1>

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
