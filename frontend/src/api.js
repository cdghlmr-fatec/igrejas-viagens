// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gruesome-coffin-jjr4jxrvg6vj3grp-8081.app.github.dev/api/auth/', // Substitua pela sua URL de API
});

// Função de login
export const login = async (credentials) => {
  const response = await api.post('/signin', credentials);
  console.log(response.data["accessToken"])
  return response.data["accessToken"]; // Supondo que a resposta contenha o token JWT
};
