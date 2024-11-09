import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import './home.css';

export function Home() {
    const { isAuthenticated } = useContext(AuthContext);
    console.log('isAuthenticated:', isAuthenticated);

    return (
        <div className="home-container">
            <div className="content">
                <h1>Bem-vindo ao sistema de gerenciamento de excursões!</h1>
                <p>Utilize o menu para navegar pelas funcionalidades disponíveis.</p>
                {!isAuthenticated ? (
                    <div className="button-group">
                        <Link to="/login" className="btn btn-primary">Login</Link>
                        <Link to="/register" className="btn btn-secondary">Registrar</Link>
                    </div>
                ) : (
                    <p className="logged-in-message">Você está logado! Navegue pelas opções disponíveis.</p>
                )}
            </div>
        </div>
    );
} 