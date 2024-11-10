import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './secretaria.css';
import OnibusList from './OnibusList';
import ExcursaoList from './ExcursaoList';

export function Secretaria() {
  const [user, setUser] = useState(null);
  const [secretariaData, setSecretariaData] = useState(null);
  const [onibusData, setOnibusData] = useState([]);
  const [excursaoData, setExcursaoData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const roles = JSON.parse(localStorage.getItem('roles'));
    

    if (!token || !roles) {
      navigate('/login');
    } else {
      if (!roles.includes('ROLE_SECRETARIA')) {
        navigate('/login');
      } else {
        fetchUserData(token);
        fetchSecretariaData(token);
        fetchOnibusData(token);
        fetchExcursaoData(token);
      }
    }
  }, [navigate]);

  const fetchUserData = async (token) => {
    const name = localStorage.getItem('username');
    console.log('Name:', name);
    setUser({
      username: name,
      email: 'ceci@exemplo.com',
    });
  };

  const fetchSecretariaData = async (token) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/api/secretaria',
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };

    axios.request(config)
      .then((response) => {
        setSecretariaData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(secretariaData);
  };

  const fetchOnibusData = async (token) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/api/secretaria/onibus',
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };

    axios.request(config)
      .then((response) => {
        console.log('Onibus Data:', response.data);
        setOnibusData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchExcursaoData = async (token) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/api/secretaria/excursao',
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };

    axios.request(config)
      .then((response) => {
        console.log('Excursao Data:', response.data);
        setExcursaoData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    navigate('/login');
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

      <div className='secretaria-content'>
        
        <div className='onibus-content'>
        <OnibusList onibusData={onibusData} fetchOnibusData={fetchOnibusData} />
        </div>

        <div className='excursao-content'>
        <ExcursaoList excursaoData={excursaoData} fetchExcursaoData={fetchExcursaoData} />
        </div>
      </div>

      <button className="btn btn-danger" onClick={handleLogout}>Sair</button>
    </div>
  );
}