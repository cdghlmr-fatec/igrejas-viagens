import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import './login.css';

import logo from '../../assets/ConexAp.png';
import fundo from '../../assets/fundoConex.jpg';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/auth/signin', { username, password });
            const { accessToken } = response.data;

            const decodedToken = jwtDecode(accessToken);
            const roles = decodedToken.roles;

            localStorage.setItem('token', accessToken);
            localStorage.setItem('roles', JSON.stringify(roles));

            if (roles.includes('ROLE_ADMIN')) {
                navigate('/admin');
            } else if (roles.includes('ROLE_COORDENADOR')) {
                navigate('/coordenador');
            } else if (roles.includes('ROLE_SECRETARIA')) {
                navigate('/secretaria');
            } else {
                navigate('/login');
            }

            alert('Login bem-sucedido');
        } catch (error) {
            setError(error.response?.data?.message || 'Usuário ou senha incorretos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row mt-page h-100 w-100 m-0 p-0">
            <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
                <form className="form-signin w-75" onSubmit={handleLogin}>
                    <img src={logo} className="logo mb-2" alt="Logo" />
                    <h4 className="mb-4">Gerencie sua excursão de forma descomplicada.</h4>
                    <h5 className="mb-4 text-secondary">Acesse sua conta</h5>
                    <div className="mt-4">
                        <input
                            className="w-75"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            className="w-75"
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="mt-2 text-danger">{error}</div>}
                    <div className="mt-3 mb-5">
                        <button className="btn-login btn btn-primary w-75" type="submit" disabled={loading}>
                            {loading ? 'Carregando...' : 'Login'}
                        </button>
                    </div>
                    <div>
                        <span className="me-1">Não tenho uma conta.</span>
                        <Link to="/solicitacao">Solicite agora!</Link>
                    </div>
                </form>
            </div>
            <div className="col-sm-7 p-0">
                <img src={fundo} className="background-login" alt="Background" />
            </div>
        </div>
    );
}