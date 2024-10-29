import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://accursed-crypt-rwx4xqv5qxrh59gq-8080.app.github.dev/api/auth/signin', loginData);
      console.log('Login realizado com sucesso:', response.data);
      localStorage.setItem('token', response.data.token);
      alert('Login realizado com sucesso!');
    } catch (error) {
      console.error('Erro de login:', error);
      alert('Erro no login');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>Username: <input type="text" name="username" onChange={handleChange} /></label>
      <label>Password: <input type="password" name="password" onChange={handleChange} /></label>
      <button type="submit">Entrar</button>
    </form>
  );
}

export default Login;
