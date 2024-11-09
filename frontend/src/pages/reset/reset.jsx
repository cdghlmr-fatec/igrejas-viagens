import React, { useState } from 'react';
import axios from 'axios';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Lógica para enviar email de reset de senha
    const data = JSON.stringify({ email });

    const config = {
      method: 'post',
      url: 'http://localhost:8080/api/auth/send-password', // Certifique-se de incluir o protocolo (http://)
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      setMessage('Email de reset enviado com sucesso!');
      setError(''); // Limpa qualquer erro anterior
      console.log(JSON.stringify(response.data));
    } catch (error) {
      setError('Erro ao enviar email de reset. Tente novamente.');
      setMessage(''); // Limpa qualquer mensagem anterior
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Reset de Senha</h1>
      <form onSubmit={handleResetPassword}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Enviar Email de Reset
        </button>
      </form>
      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default ResetPasswordPage;