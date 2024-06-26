import { useState } from "react";
import axios from "axios";
import { message } from "antd";

const API_URL = process.env.REACT_APP_API_URL;


const register = (username, email, password, password2, admin_key) => {
  return axios.post(API_URL + "/auth/register", {
    username,
    email,
    password,
    password2,
    admin_key,
  })
};

const login = (username, password) => {
  return axios
    .post(API_URL + "/auth/token", {
      email: username,
      password,
    });
};

const me = () => {
  console.log("Auth Token:", JSON.parse(localStorage.getItem("authToken")).access)
  return axios.get(API_URL + "/user/me", {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("authToken")).access,
    },
  }).then(response => {
    message.success("Get me data successfully")
    console.log("Me:", response)
    localStorage.setItem("user", JSON.stringify(response));
  }).catch(error => {
    message.error('Failed to get user data')
  });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("authToken");
  return axios.post(API_URL + "/auth/logout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("authToken"));
};

const getToken = () => {
  return JSON.parse(localStorage.getItem("authToken"));
};

const getAccessToken = () => {
  const tokenPair = JSON.parse(localStorage.getItem("authToken"));
  return tokenPair ? tokenPair.access : null;
};

const AuthService = {
  register,
  login,
  logout,
  me,
  getAccessToken,
  getCurrentUser,
  getToken,
};

export default AuthService;
