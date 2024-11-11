import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './secretaria.css';

export function Secretaria() {
  const [users, setUsers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [excursions, setExcursions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Pode ser um ônibus ou excursão
  const [form, setForm] = useState({
    type: 'bus', // Indica se é ônibus ou excursão
    plate: '',
    capacity: '',
    model: '',
    driverName: '',
    status: '',
    name: '',
    date: '',
    destination: ''
  });
  const navigate = useNavigate();

  const name_usuario = localStorage.getItem('username');
  const email_usuario = localStorage.getItem('email');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const roles = JSON.parse(localStorage.getItem('roles'));

    if (!token || !roles || !roles.includes('ROLE_SECRETARIA')) {
      navigate('/login');
    } else {
      fetchUsers(token);
      fetchBuses(token);
      fetchExcursions(token);
    }
  }, [navigate]);

  const fetchUsers = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchBuses = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/api/secretaria/onibus', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBuses(response.data);
    } catch (error) {
      console.error('Error fetching buses:', error);
    }
  };

  const fetchExcursions = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/api/secretaria/excursao', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExcursions(response.data);
    } catch (error) {
      console.error('Error fetching excursions:', error);
    }
  };

  const handleEdit = (item, type) => {
    setSelectedItem(item);
    setForm({
      ...item,
      type
    });
  };

  const handleDelete = async (item, type) => {
    const token = localStorage.getItem('token');
    const url = type === 'bus' 
      ? `http://localhost:8080/api/secretaria/delete/bus/${item.id}`
      : `http://localhost:8080/api/secretaria/delete/excursion/${item.id}`;
    try {
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      type === 'bus' ? fetchBuses(token) : fetchExcursions(token);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const type = form.type;

    const itemData = type === 'bus' ? {
      plate: form.plate,
      capacity: form.capacity,
      model: form.model,
      driverName: form.driverName,
      status: form.status
    } : {
      name: form.name,
      date: form.date,
      destination: form.destination
    };

    const url = selectedItem
      ? `http://localhost:8080/api/secretaria/update/${type}/${selectedItem.id}`
      : `http://localhost:8080/api/secretaria/create/${type}`;

    try {
      if (selectedItem) {
        await axios.put(url, itemData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(url, itemData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      type === 'bus' ? fetchBuses(token) : fetchExcursions(token);
      resetForm();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const resetForm = () => {
    setSelectedItem(null);
    setForm({
      type: 'bus',
      plate: '', capacity: '', model: '', driverName: '', status: '',
      name: '', date: '', destination: ''
    });
  };

  return (
    <div className="dashboard-container">      
      <h1>Bem-vindo à Secretaria !</h1>
      <h2>Usuário: {name_usuario}</h2>
      <h2>Email: {email_usuario}</h2>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {form.type === 'bus' ? (
            <>
              <input type="text" placeholder="Plate" value={form.plate} onChange={(e) => setForm({ ...form, plate: e.target.value })} required />
              <input type="text" placeholder="Model" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} required />
              <input type="text" placeholder="Capacity" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} required />
              <input type="text" placeholder="Driver Name" value={form.driverName} onChange={(e) => setForm({ ...form, driverName: e.target.value })} required />
              <input type="text" placeholder="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} required />
            </>
          ) : (
            <>
              <input type="text" placeholder="Excursion Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <input type="date" placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
              <input type="text" placeholder="Destination" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} required />
            </>
          )}
          <button type="submit">{selectedItem ? 'Atualizar' : 'Criar'} {form.type}</button>
          <button type="button" onClick={resetForm}>Cancelar</button>
        </form>
      </div>

      <div className="content-list">
        <h2>Lista de Ônibus</h2>
        <div>
          {buses.map(bus => (
            <div key={bus.id}>
              <span>{bus.plate} - {bus.model}</span>
              <button onClick={() => handleEdit(bus, 'bus')}>Editar</button>
              <button onClick={() => handleDelete(bus, 'bus')}>Excluir</button>
            </div>
          ))}
        </div>

        <h2>Lista de Excursões</h2>
        <div>
          {excursions.map(excursion => (
            <div key={excursion.id}>
              <span>{excursion.name} - {excursion.date}</span>
              <button onClick={() => handleEdit(excursion, 'excursion')}>Editar</button>
              <button onClick={() => handleDelete(excursion, 'excursion')}>Excluir</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
