import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './admin.css';

export function Admin() {
    const [users, setUsers] = useState([]);
    const [buses, setBuses] = useState([]);
    const [trips, setTrips] = useState([]);

    const [selectedTrip, setSelectedTrip] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedBus, setSelectedBus] = useState(null);
    
    const [form, setForm] = useState({ username: '', email: '', password: '', phone: '', church: '', roles: [] });
    const [formBus, setFormBus] = useState({ plate: '', model: '', capacity: '', driverName: '', status: '' });
    const [formTrip, setFormTrip] = useState({ date: '', destination: '', busIds: [], reservations: [] });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const roles = JSON.parse(localStorage.getItem('roles'));

        if (!token || !roles || !roles.includes('ROLE_ADMIN')) {
            navigate('/login');
        } else {
            fetchUsers(token);
            fetchBuses(token);
            fetchTrips(token);
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

    const fetchTrips = async (token) => {
        try {
            const response = await axios.get('http://localhost:8080/api/secretaria/excursao', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTrips(response.data);
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        const userData = {
            username: form.username,
            email: form.email,
            password: form.password,
            phone: form.phone,
            church: form.church,
            roles: form.roles.filter(role => typeof role === 'string')
        };

        try {
            if (selectedUser) {
                await axios.put(`http://localhost:8080/api/admin/update/${selectedUser.id}`, userData, {
                    headers: { 
                        Authorization: `Bearer ${token}`, 
                        'Content-Type': 'application/json' 
                    }
                });
            } else {
                await axios.post('http://localhost:8080/api/admin/create', userData, {
                    headers: { 
                        Authorization: `Bearer ${token}`, 
                        'Content-Type': 'application/json' 
                    }
                });
            }
            fetchUsers(token);
            resetForm();
        } catch (error) {
            console.error('Error saving user:', error.response ? error.response.data : error.message);
        }
    };

    const handleSubmitBus = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const busData = {
            plate: formBus.plate,
            model: formBus.model,
            capacity: formBus.capacity,
            driverName: formBus.driverName,
            status: formBus.status
        };

        try {
            if (selectedBus) {
                await axios.put(`http://localhost:8080/api/secretaria/onibus/${selectedBus.id}`, busData, {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
                });
            } else {
                await axios.post('http://localhost:8080/api/secretaria/onibus', busData, {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
                });
            }
            fetchBuses(token);
            resetFormBus();
        } catch (error) {
            console.error('Error saving bus:', error.response ? error.response.data : error.message);
        }
    };

    const handleSubmitTrip = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        const tripData = {
            date: formTrip.date,
            destination: formTrip.destination,
            busIds: formTrip.busIds,
            reservations: formTrip.reservations
        };

        try {
            if (selectedTrip) {
                await axios.put(`http://localhost:8080/api/secretaria/excursao/${selectedTrip.id}`, tripData, {
                    headers: { 
                        Authorization: `Bearer ${token}`, 
                        'Content-Type': 'application/json' 
                    }
                });
            } else {
                await axios.post('http://localhost:8080/api/secretaria/excursao', tripData, {
                    headers: { 
                        Authorization: `Bearer ${token}`, 
                        'Content-Type': 'application/json' 
                    }
                });
            }
            fetchTrips(token);
            resetFormTrip();
        } catch (error) {
            console.error('Error saving trip:', error.response ? error.response.data : error.message);
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setForm({
            username: user.username,
            email: user.email,
            password: '',
            phone: user.phone,
            church: user.church,
            roles: user.roles
        });
    };

    const handleEditBus = (bus) => {
        setSelectedBus(bus);
        setFormBus({
            plate: bus.plate,
            model: bus.model,
            capacity: bus.capacity,
            driverName: bus.driverName,
            status: bus.status
        });
    };

    const handleEditTrip = (trip) => {
        setSelectedTrip(trip);
        setFormTrip({
            date: trip.date,
            destination: trip.destination,
            busIds: trip.busIds,
            reservations: trip.reservations
        });
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8080/api/admin/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsers(token);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleDeleteBus = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8080/api/secretaria/onibus/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchBuses(token);
        } catch (error) {
            console.error('Error deleting bus:', error);
        }
    };

    const handleDeleteTrip = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8080/api/secretaria/excursao/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTrips(token);
        } catch (error) {
            console.error('Error deleting trip:', error);
        }
    };

    const resetForm = () => {
        setSelectedUser(null);
        setForm({ username: '', email: '', password: '', phone: '', church: '', roles: [] });
    };

    const resetFormBus = () => {
        setSelectedBus(null);
        setFormBus({ plate: '', model: '', capacity: '', driverName: '', status: '' });
    };

    const resetFormTrip = () => {
        setSelectedTrip(null);
        setFormTrip({ date: '', destination: '', busIds: [], reservations: [] });
    };

    const toggleRole = (role) => {
        setForm((prevForm) => ({
            ...prevForm,
            roles: prevForm.roles.includes(role)
                ? prevForm.roles.filter(r => r !== role)
                : [...prevForm.roles, role]
        }));
    };

    const handleBusIdChange = (index, value) => {
        const newBusIds = [...formTrip.busIds];
        newBusIds[index] = value;
        setFormTrip({ ...formTrip, busIds: newBusIds });
    };

    const addBusIdField = () => {
        setFormTrip({ ...formTrip, busIds: [...formTrip.busIds, ''] });
    };

    const removeBusIdField = (index) => {
        const newBusIds = formTrip.busIds.filter((_, i) => i !== index);
        setFormTrip({ ...formTrip, busIds: newBusIds });
    };

    const handleReservationChange = (index, value) => {
        const newReservations = [...formTrip.reservations];
        newReservations[index] = value;
        setFormTrip({ ...formTrip, reservations: newReservations });
    };

    const addReservationField = () => {
        setFormTrip({ ...formTrip, reservations: [...formTrip.reservations, ''] });
    };

    const removeReservationField = (index) => {
        const newReservations = formTrip.reservations.filter((_, i) => i !== index);
        setFormTrip({ ...formTrip, reservations: newReservations });
    };

    return (
        <div>
            <div className="conteiner">
                <div className='content-one'>
                <div className="form-container">
                    <h1 className="text-center mb-4">Gerenciar Usuários</h1>
                    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-light">
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Church" value={form.church} onChange={(e) => setForm({ ...form, church: e.target.value })} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Roles:</label>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" checked={form.roles.includes('ADMIN')} onChange={() => toggleRole('ADMIN')} />
                                <label className="form-check-label">Admin</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" checked={form.roles.includes('SECRETARIA')} onChange={() => toggleRole('SECRETARIA')} />
                                <label className="form-check-label">Secretaria</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" checked={form.roles.includes('COORDENADOR')} onChange={() => toggleRole('COORDENADOR')} />
                                <label className="form-check-label">Coordenador</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary me-2">{selectedUser ? 'Atualizar' : 'Criar'} Usuário</button>
                        <button type="button" onClick={resetForm} className="btn btn-secondary">Cancelar</button>
                    </form>
                </div>

                <div className="user-list">
                    <h2>Lista de Usuários</h2>
                    <ul className="list-group">
                        {users.map(user => (
                            <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{user.username}</strong> ({user.email})
                                    <br />
                                    <small>{user.phone} - {user.church}</small>
                                    <br />
                                    <small>Roles: {user.roles.map(role => role.name).join(', ')}</small>
                                </div>
                                <div>
                                    <button className="btn btn-warning me-2" onClick={() => handleEdit(user)}>Editar</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Excluir</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                </div>

                <div className='content-two'>
                <div className="form-container">
                    <h1 className="text-center mb-4">Gerenciar Ônibus</h1>
                    <form onSubmit={handleSubmitBus} className="mb-4 p-4 border rounded bg-light">
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Plate" value={formBus.plate} onChange={(e) => setFormBus({ ...formBus, plate: e.target.value })} required />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Model" value={formBus.model} onChange={(e) => setFormBus({ ...formBus, model: e.target.value })} required />
                        </div>
                        <div className="mb-3">
                            <input type="number" className="form-control" placeholder="Capacity" value={formBus.capacity} onChange={(e) => setFormBus({ ...formBus, capacity: e.target.value })} required />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Driver Name" value={formBus.driverName} onChange={(e) => setFormBus({ ...formBus, driverName: e.target.value })} required />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Status" value={formBus.status} onChange={(e) => setFormBus({ ...formBus, status: e.target.value })} required />
                        </div>

                        <button type="submit" className="btn btn-primary me-2">{selectedBus ? 'Atualizar' : 'Criar'} Ônibus</button>
                        <button type="button" onClick={resetFormBus} className="btn btn-secondary">Cancelar</button>
                    </form>
                </div>

                <div className="bus-list">
                    <h2>Lista de Ônibus</h2>
                    <ul className="list-group">
                        {buses.map(bus => (
                            <li key={bus.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{bus.plate}</strong> ({bus.model})
                                    <br />
                                    <small>Capacidade: {bus.capacity}</small>
                                    <br />
                                    <small>Motorista: {bus.driverName}</small>
                                    <br />
                                    <small>Status: {bus.status}</small>
                                </div>
                                <div>
                                    <button className="btn btn-warning me-2" onClick={() => handleEditBus(bus)}>Editar</button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteBus(bus.id)}>Excluir</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                </div>

                <div className='content-three'>
                <div className="form-container">
                    <h1 className="text-center mb-4">Gerenciar Excursões</h1>
                    <form onSubmit={handleSubmitTrip} className="mb-4 p-4 border rounded bg-light">
                        <div className="mb-3">
                            <input type="date" className="form-control" placeholder="Date" value={formTrip.date} onChange={(e) => setFormTrip({ ...formTrip, date: e.target.value })} required />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Destination" value={formTrip.destination} onChange={(e) => setFormTrip({ ...formTrip, destination: e.target.value })} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Bus IDs:</label>
                            {formTrip.busIds.map((busId, index) => (
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
                        <div className="mb-3">
                            <label className="form-label">Reservations:</label>
                            {formTrip.reservations.map((reservation, index) => (
                                <div key={index} className="d-flex mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={reservation}
                                        onChange={(e) => handleReservationChange(index, e.target.value)}
                                        required
                                    />
                                    <button type="button" className="btn btn-danger ms-2" onClick={() => removeReservationField(index)}>Remover</button>
                                </div>
                            ))}
                            <button type="button" className="btn btn-secondary mt-2" onClick={addReservationField}>Adicionar Reserva</button>
                        </div>
                        <button type="submit" className="btn btn-primary me-2">{selectedTrip ? 'Atualizar' : 'Criar'} Excursão</button>
                        <button type="button" onClick={resetFormTrip} className="btn btn-secondary">Cancelar</button>
                    </form>
                </div>

                <div className="user-list">
                    <h2>Lista de Excursões</h2>
                    <ul className="list-group">
                        {trips.map((trip) => (
                            <li key={trip.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{trip.destination}</strong> ({trip.date})
                                    <br />
                                    <small>Buses: {trip.busIds.join(', ')}</small>
                                    <br />
                                    <small>Reservations: {trip.reservations.join(', ')}</small>
                                </div>
                                <div>
                                    <button className="btn btn-warning me-2" onClick={() => handleEditTrip(trip)}>Editar</button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteTrip(trip.id)}>Excluir</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                </div>
            </div>
        </div>
    );
}
