import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar.jsx';

export function Admin() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [form, setForm] = useState({ username: '', email: '', password: '', roles: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const roles = JSON.parse(localStorage.getItem('roles'));

        if (!token || !roles || !roles.includes('ROLE_ADMIN')) {
            navigate('/login');
        } else {
            fetchUsers(token);
        }
    }, [navigate]);

    const fetchUsers = async (token) => {
        try {
            const response = await axios.get('https://miniature-journey-559g9jp76j4cvg9v-8090.app.github.dev/api/admin', {
                headers: { 
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            if (selectedUser) {
                await axios.put(`https://miniature-journey-559g9jp76j4cvg9v-8090.app.github.dev/api/admin/update/${selectedUser.id}`, form, {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setUsers(users.map(user => user.id === selectedUser.id ? { ...selectedUser, ...form } : user));
            } else {
                const response = await axios.post('https://miniature-journey-559g9jp76j4cvg9v-8090.app.github.dev/api/admin/create', form, {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setUsers([...users, response.data]);
            }
            setForm({ username: '', email: '', password: '', roles: '' });
            setSelectedUser(null);
        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setForm(user);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`https://miniature-journey-559g9jp76j4cvg9v-8090.app.github.dev/api/admin/delete/${id}`, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="content">
                <h1>Gerenciamento de Usuários</h1>
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="user-form">
                        <input type="text" name="username" placeholder="Nome de usuário" value={form.username} onChange={handleInputChange} required />
                        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleInputChange} required />
                        <input type="password" name="password" placeholder="Senha" value={form.password} onChange={handleInputChange} required />
                        <input type="text" name="roles" placeholder="Roles (separadas por vírgula)" value={form.roles} onChange={handleInputChange} required />
                        <button type="submit">{selectedUser ? 'Atualizar' : 'Criar'}</button>
                    </form>
                </div>
                <div className="user-list">
                    <h2>Lista de Usuários</h2>
                    <ul>
                        {users.map(user => (
                            <li key={user.id} className="user-item">
                                <span>{user.username} ({user.email}) - Roles: {user.roles.map(role => role.name).join(', ')}</span>
                                <div className="actions">
                                    <button className="edit-btn" onClick={() => handleEdit(user)}>Editar</button>
                                    <button className="delete-btn" onClick={() => handleDelete(user.id)}>Deletar</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
