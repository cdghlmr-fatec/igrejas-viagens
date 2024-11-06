import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Garantir que axios seja importado
import './solicitacao.css';

import logo from '../../assets/ConexAp.png';
import fundo from '../../assets/fundoConex.jpg';

export function Solicitacao() {
  const navigate = useNavigate();

  // Definindo os estados dos campos de formulário e de erro
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [church, setChurch] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  // Função para enviar a solicitação para a API
  const handleRequest = async (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Validação simples dos campos
    if (!name || !email || !church || !phone) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // Preparando os dados para a requisição
    const data = JSON.stringify({
      username: name,
      email: email,
      roles: ['mod', 'admin'], // ou conforme a lógica do seu sistema
      password: '12345678', // Alterar conforme necessário, ou não enviar esta chave
    });

    const config = {
      method: 'post',
      url: 'https://gruesome-coffin-jjr4jxrvg6vj3grp-8081.app.github.dev/api/auth/signup',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log(response.data);
      alert('Solicitação enviada com sucesso!'); // Sucesso
      navigate('/login'); // Redireciona para a página de login
    } catch (err) {
      setError('Ocorreu um erro ao enviar sua solicitação. Tente novamente.');
      console.error(err);
    }
  };

  return (
    <div className="row mt-page h-100 w-100 m-0 p-0">
      <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
        <form className="form-signin w-75 justify-content-center align-items-center text-center p-0" onSubmit={handleRequest}>
          <div className="justify-content-center align-items-center text-center">
            <img src={logo} className="logo mb-2" alt="Logo" />
            <h4 className="mb-4 w-100">Solicite sua conta.</h4>
            <h5 className="mb-4 text-secondary">Preencha os campos abaixo.</h5>
          </div>

          <div className="mt-2">
            <input
              className="w-75"
              type="text"
              placeholder="Informe o seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mt-2">
            <input
              className="w-75"
              type="email"
              placeholder="Informe o seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-2">
            <input
              className="w-75"
              type="text"
              placeholder="Informe a igreja que congrega"
              value={church}
              onChange={(e) => setChurch(e.target.value)}
              required
            />
          </div>
          <div className="mt-2">
            <input
              className="w-75"
              type="tel"
              placeholder="Informe um telefone para contato"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {error && <div className="mt-2 text-danger">{error}</div>} {/* Exibição do erro */}

          <div className="mt-3 mb-5">
            <button className="btn-login btn btn-primary w-75" type="submit">Solicitar minha conta</button>
          </div>

          <div>
            <span className="me-1">Já tenho uma conta.</span>
            <Link to="/">Acessar agora!</Link>
          </div>
        </form>
      </div>

      <div className="col-sm-7 p-0">
        <img src={fundo} className="background-login" alt="Background" />
      </div>
    </div>
  );
}
