import React, { useState } from 'react';
import axios from 'axios';

const ExcursaoForm = ({ fetchExcursaoData }) => {
  const [destino, setDestino] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post('http://localhost:8080/api/secretaria/excursao', { destino, data }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response.data);
      fetchExcursaoData(token);
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Destino</label>
        <input type="text" className="form-control" value={destino} onChange={(e) => setDestino(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Data</label>
        <input type="date" className="form-control" value={data} onChange={(e) => setData(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Adicionar Excursão</button>
    </form>
  );
};

export default ExcursaoForm;