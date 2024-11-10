import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Coordenador() {
  const [user, setUser] = useState(null);
  const [reservasData, setReservasData] = useState([]);
  const [pagamentosData, setPagamentosData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const roles = JSON.parse(localStorage.getItem('roles'));

    if (!token || !roles || !roles.includes('ROLE_COORDENADOR')) {
      navigate('/login');
    } else {
      fetchUserData(token);
      fetchReservasData(token);
      fetchPagamentosData(token);
    }
  }, [navigate]);

  const fetchUserData = async (token) => {
    // Simulação de dados do usuário
    setUser({ username: 'coordenador', email: 'coordenador@example.com' });
  };

  const fetchReservasData = async (token) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/api/coordenador/reservas',
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };

    axios.request(config)
      .then((response) => {
        console.log('Reservas Data:', response.data);
        setReservasData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPagamentosData = async (token) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/api/pagamentos',
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };

    axios.request(config)
      .then((response) => {
        console.log('Pagamentos Data:', response.data);
        setPagamentosData(response.data);
      })
      .catch((error) => {
        console.log(error);
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
      <h1>Bem-vindo, Coordenador!</h1>

      {user ? (
        <div className="user-info">
          <p><strong>Nome:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Carregando informações do usuário...</p>
      )}

      <h2>Reservas</h2>
      <ul className="list-group">
        {reservasData.map((reserva) => (
          <li key={reserva.id} className="list-group-item">
            {reserva.userId} - {reserva.excursionId} - {reserva.busId} - {reserva.reservationDate}
          </li>
        ))}
      </ul>

      <h2>Pagamentos</h2>
      <ul className="list-group">
        {pagamentosData.map((pagamento) => (
          <li key={pagamento.paymentId} className="list-group-item">
            {pagamento.reservationId} - {pagamento.passengerName} - {pagamento.amount} - {pagamento.paymentDate} - {pagamento.status}
          </li>
        ))}
      </ul>

      <button className="btn btn-danger" onClick={handleLogout}>Sair</button>
    </div>
  );
}
