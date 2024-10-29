import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '', roles: [] });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://seu_backend_url/api/auth/signup', signupData);
      alert('Cadastro realizado com sucesso!');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro no cadastro');
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <label>Username: <input type="text" name="username" onChange={handleChange} /></label>
      <label>Email: <input type="email" name="email" onChange={handleChange} /></label>
      <label>Password: <input type="password" name="password" onChange={handleChange} /></label>
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default Signup;
