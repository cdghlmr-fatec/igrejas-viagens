import axios from "axios";

const API_URL = "https://gruesome-coffin-jjr4jxrvg6vj3grp-8081.app.github.dev/api/auth/";

const register = (username, email, password, birthdate) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    birthdate,
  });
};

const login = async (username, password) => {
  const response = await axios.post(API_URL + "signin", {
    username,
    password,
  });

  if (response.data.jwtToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
    console.log(response.data)
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getProfile = () => {
  return axios.get("https://gruesome-coffin-jjr4jxrvg6vj3grp-8081.app.github.dev/api/teste/user", {
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).jwtToken,
    },
  });
};

const AuthService = {
  register,
  login,
  logout,
  getProfile,
};

export default AuthService;
