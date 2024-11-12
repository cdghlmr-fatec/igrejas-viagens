import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './admin.css';

export function Admin() {
    const [users, setUsers] = useState([]);
    const [onibus, setOnibus] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [form, setForm] = useState({ username: '', email: '', password: '', phone: '', church: '', roles: [] });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const roles = JSON.parse(localStorage.getItem('roles'));

        if (!token || !roles || !roles.includes('ROLE_ADMIN')) {
            navigate('/login');
        } else {
            fetchUsers(token);
            fetchOnibus(token);
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

    const fetchOnibus = async (token) => {
        try {
            const response = await axios.get('http://localhost:8080/api/secretaria/onibus', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOnibus(response.data);
        } catch (error) {
            console.error('Error fetching buses:', error);
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
            roles: form.roles.filter(role => typeof role === 'string') // Filter to ensure roles are strings
        };

        try {
            if (selectedUser) {
                // Update user
                await axios.put(`http://localhost:8080/api/admin/update/${selectedUser.id}`, userData, {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
                });
            } else {
                // Create user
                await axios.post('http://localhost:8080/api/admin/create', userData, {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
                });
            }
            fetchUsers(token);
            resetForm();
        } catch (error) {
            console.error('Error saving user:', error.response ? error.response.data : error.message);
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

    const handleEditBus = (bus) => {
        // Handle bus edit logic here
    };

    const handleDeleteBus = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8080/api/secretaria/onibus/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchOnibus(token);
        } catch (error) {
            console.error('Error deleting bus:', error);
        }
    };

    const resetForm = () => {
        setSelectedUser(null);
        setForm({ username: '', email: '', password: '', phone: '', church: '', roles: [] });
    };

    const toggleRole = (role) => {
        setForm(prevForm => ({
            ...prevForm,
            roles: prevForm.roles.includes(role)
                ? prevForm.roles.filter(r => r !== role)
                : [...prevForm.roles, role]
        }));
    };

    return (
        <div className='container'>
            <div className="content-admin">
                <div className="form-container">
                    <h1 className="text-center mb-4">Admin - Gerenciar Usuários</h1>
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

            <div className="content-admin2">
                <div className="user-list">
                    <h2>Lista de Ônibus</h2>
                    <ul className="list-group">
                        {onibus.map(bus => (
                            <li key={bus.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{bus.plate}</strong> ({bus.capacity})
                                    <br />
                                    <small>{bus.model} - {bus.driverName} - {bus.status}</small>
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
        </div>
    );
}
