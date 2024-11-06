import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios at the top
import './login.css';

import logo from '../../assets/ConexAp.png';
import fundo from '../../assets/fundoConex.jpg';

export function Login() {
  // Declare state for form fields and error handling
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To redirect after successful login

  // Function to handle the login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Send a POST request with the username and password
      const response = await axios.post('https://gruesome-coffin-jjr4jxrvg6vj3grp-8081.app.github.dev/api/auth/signin', {
        username,
        password
      });

      const { accessToken } = response.data;
      localStorage.setItem('token', accessToken); // Save token to localStorage
      console.log(response.data)
      console.log(accessToken)
      alert('Login bem-sucedido');
      navigate('/secretaria'); // Redirect to the dashboard or protected page
    } catch (error) {
      setError('Usuário ou senha incorretos');
    }
  };

  return (
    <div className="row mt-page h-100 w-100 m-0 p-0">
      <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
        <form className="form-signin w-75 justify-content-center align-items-center text-center p-0" onSubmit={handleLogin}>
          <div className="justify-content-center align-items-center text-center">
            <img src={logo} className="logo mb-2" alt="Logo" />
            <div className="d-flex justify-content-center align-items-center text-center">
              <h4 className="mb-4 w-100">Gerencie sua excursão de forma descomplicada.</h4>
            </div>
            <h5 className="mb-4 text-secondary">Acesse sua conta</h5>
          </div>
          <div className="mt-4">
            <input
              className="w-75"
              type="text"
              placeholder="E-mail"
              value={username}
              onChange={(e) => setUsername(e.target.value)}  // Bind username state
              required
            />
          </div>
          <div className="mt-2">
            <input
              className="w-75"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Bind password state
              required
            />
          </div>
          {error && <div className="mt-2 text-danger">{error}</div>}  {/* Display error message */}
          <div className="mt-3 mb-5">
            <button className="btn-login btn btn-primary w-75" type="submit">Login</button>
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
