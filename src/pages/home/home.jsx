import React, { useContext } from 'react';
import Navbar from '../../components/navbar/navbar.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

export function Home() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className="home-container">
            <Navbar />
            <div className="text-center mt-5">
                <h1>Bem-vindo ao sistema de gerenciamento de excursões!</h1>
                <p>Utilize o menu para navegar pelas funcionalidades disponíveis.</p>
                {!isAuthenticated ? (
                    <div className="mt-4">
                        <Link to="/login" className="btn btn-primary me-2">Login</Link>
                        <Link to="/register" className="btn btn-secondary">Sign Up</Link>
                    </div>
                ) : (
                    <p className="mt-4">Você está logado! Navegue pelas opções disponíveis.</p>
                )}
            </div>
        </div>
    );
} 