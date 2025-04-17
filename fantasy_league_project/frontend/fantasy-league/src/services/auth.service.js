import axios from "axios";

const API_URL = "http://localhost:8080/";

const signup = (email, password, teamName, userName) => {
  return axios
    .post(API_URL + "user", {
      email,
      password,
      teamName,
      userName,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch((error) => {
      console.error("Signup error:", error.response?.data || error.message);
      throw error;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "auth/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch((error) => {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
