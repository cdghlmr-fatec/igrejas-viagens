import React, { useState } from 'react';
import axios from 'axios';

const ExcursaoForm = ({ fetchExcursaoData }) => {
  const [date, setDate] = useState('');
  const [destination, setDestination] = useState('');
  const [busIds, setBusIds] = useState(['']);
  const [reservations, setReservations] = useState(['']);

  const handleBusIdChange = (index, value) => {
    const newBusIds = [...busIds];
    newBusIds[index] = value;
    setBusIds(newBusIds);
  };

  const addBusIdField = () => {
    setBusIds([...busIds, '']);
  };

  const removeBusIdField = (index) => {
    const newBusIds = busIds.filter((_, i) => i !== index);
    setBusIds(newBusIds);
  };

  const handleReservationChange = (index, value) => {
    const newReservations = [...reservations];
    newReservations[index] = value;
    setReservations(newReservations);
  };

  const addReservationField = () => {
    setReservations([...reservations, '']);
  };

  const removeReservationField = (index) => {
    const newReservations = reservations.filter((_, i) => i !== index);
    setReservations(newReservations);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No token found');
        return;
    }

    try {
        const response = await axios.post('http://localhost:8080/api/secretaria/excursao', {
            date,
            destination,
            busIds,
            reservations
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        fetchExcursaoData(token);
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Data</label>
        <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Destino</label>
        <input type="text" className="form-control" value={destination} onChange={(e) => setDestination(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>IDs dos Ônibus</label>
        {busIds.map((busId, index) => (
          <div key={index} className="d-flex mb-2">
            <input
              type="text"
              className="form-control"
              value={busId}
              onChange={(e) => handleBusIdChange(index, e.target.value)}
              required
            />
            <button type="button" className="btn btn-danger ms-2" onClick={() => removeBusIdField(index)}>Remover</button>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mt-2" onClick={addBusIdField}>Adicionar ID de Ônibus</button>
      </div>
      <div className="form-group">
        <label>Reservas</label>
        {reservations.map((reservation, index) => (
          <div key={index} className="d-flex mb-2">
            <input
              type="text"
              className="form-control"
              value={reservation}
              onChange={(e) => handleReservationChange(index, e.target.value)}
            />
            <button type="button" className="btn btn-danger ms-2" onClick={() => removeReservationField(index)}>Remover</button>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mt-2" onClick={addReservationField}>Adicionar Reserva</button>
      </div>
      <button type="submit" className="btn btn-primary mt-3">Adicionar Excursão</button>
    </form>
  );
};

export default ExcursaoForm;