import React, { useState } from 'react';
import axios from 'axios';

const OnibusForm = ({ fetchOnibusData }) => {
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [motorista, setMotorista] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post('http://localhost:8080/api/secretaria/onibus', { modelo, placa, capacidade,motorista, status }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response.data);
      fetchOnibusData(token);
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Modelo</label>
        <input type="text" className="form-control" value={modelo} onChange={(e) => setModelo(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Placa</label>
        <input type="text" className="form-control" value={placa} onChange={(e) => setPlaca(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Capacidade</label>
        <input type="text" className="form-control" value={capacidade} onChange={(e) => setCapacidade(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Motorista</label>
        <input type="text" className="form-control" value={motorista} onChange={(e) => setMotorista(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Status</label>
        <input type="text" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Adicionar Ônibus</button>
    </form>
  );
};

export default OnibusForm;