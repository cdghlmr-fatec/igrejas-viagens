import axios from 'axios';

const API_URL = 'https://gruesome-coffin-jjr4jxrvg6vj3grp-8081.app.github.dev/';

const getUserBoard = () => {
  return axios.get(API_URL + 'user');
};

const getAdminBoard = () => {
  return axios.get(API_URL + 'admin');
};

const UserService = {
  getUserBoard,
  getAdminBoard,
};

export default UserService;
