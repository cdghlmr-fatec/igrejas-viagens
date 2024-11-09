import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar.jsx';

export function Admin() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [form, setForm] = useState({ username: '', email: '', password: '', phone: '', church: '', roles: '' });
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
            console.error('Error fetching users:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            navigate('/login');
            return;
        }

        let data = JSON.stringify(form);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://miniature-journey-559g9jp76j4cvg9v-8090.app.github.dev/api/admin/create',
            headers: { 
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            const response = await axios.request(config);
            console.log(JSON.stringify(response.data));
            setUsers([...users, response.data]);
            setForm({ username: '', email: '', password: '', phone: '', church: '', roles: '' });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized: Invalid or expired token');
                navigate('/login');
            } else {
                console.error('Error creating user:', error);
            }
        }
    };

    return (
        <div className="container mt-5">
            <Navbar />
            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
            <div className="content">
                <h1 className="text-center mb-4">Admin Dashboard</h1>
                <div className="form-container mb-4">
                    <form className="user-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Church" value={form.church} onChange={(e) => setForm({ ...form, church: e.target.value })} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <select value={form.roles} onChange={(e) => setForm({ ...form, roles: e.target.value })} className="form-control" required>
                                <option value="">Select Role</option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="SECRETARIA">SECRETARIA</option>
                                <option value="COORDENADOR">COORDENADOR</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className="user-list">
                    <ul className="list-group">
                        {users.map(user => (
                            <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>{user.username}</span>
                                <div className="actions">
                                    <button className="btn btn-success mr-2">Edit</button>
                                    <button className="btn btn-danger">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
