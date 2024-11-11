import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './coordenador.css';

export function Coordenador() {
  const [reservas, setReservas] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const roles = JSON.parse(localStorage.getItem('roles'));

    if (!token || !roles || !roles.includes('ROLE_COORDENADOR')) {
      navigate('/login');
    } else {
      fetchReservas(token);
      fetchPagamentos(token);
    }
  }, [navigate]);

  const fetchReservas = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/api/coordenador/reservas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservas(response.data);
    } catch (error) {
      console.error('Error fetching reservas:', error);
    }
  };

  const fetchPagamentos = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/api/pagamentos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPagamentos(response.data);
    } catch (error) {
      console.error('Error fetching pagamentos:', error);
    }
  };

  return (
    <div className="coordenador-container">
      <h1>Dashboard do Coordenador</h1>
      
      <div className="reservas-section">
        <h2>Reservas</h2>
        <ul className="reservas-list">
          {reservas.map((reserva, id) => (
            <li key={id} className="reserva-item">
              <div>Usuário: {reserva.userId}</div>
              <div>Data: {reserva.reservationDate}</div>
              <div>Buses: {reserva.busId}</div>
              <div>Excursão: {reserva.excursionId}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="pagamentos-section">
        <h2>Pagamentos</h2>
        <ul className="pagamentos-list">
          {pagamentos.map((pagamento, id) => (
            <li key={id} className="pagamento-item">
              <div>Usuário: {pagamento.passengerName}</div>
              <div>Reserva: {pagamento.reservationId}</div>
              <div>Valor: R${pagamento.amount}</div>
              <div>Data: {pagamento.paymentDate}</div>
              <div>Status: {pagamento.status}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Coordenador;
