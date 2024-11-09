import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Coordenador() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const roles = JSON.parse(localStorage.getItem('roles'));

        if (!token || !roles || !roles.includes('ROLE_COORDENADOR')) {
            navigate('/login');
        } else {
            fetchUserData(token);
        }
    }, [navigate]);

    const fetchUserData = async (token) => {
        // Simulação de dados do usuário
        setUser({ username: 'coordenador', email: 'coordenador@example.com' });
    };


    // Função para logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remover o token do localStorage
        localStorage.removeItem('roles'); // Remover as roles do localStorage
        navigate('/login'); // Redireciona para a página de login
    };

    return (
        <div className="dashboard-container">
        <h1>Bem-vindo à Secretaria!</h1>

        {user ? (
            <div className="user-info">
            <p><strong>Nome:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            </div>
        ) : (
            <p>Carregando informações do usuário...</p>
        )}

        <button className="btn btn-danger" onClick={handleLogout}>Sair</button>
        </div>
    );
}
