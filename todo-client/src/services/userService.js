import { apiUrl } from '../config';
import http from './httpService';
import jwtDecode from 'jwt-decode';
import axios from "axios"; 

const tokenKey = "token";

const jwt = localStorage.getItem(tokenKey);
export const user = jwt ? jwtDecode(jwt) : null;

axios.defaults.headers.common["x-auth-token"] = jwt; 

function logout() {
  localStorage.removeItem(tokenKey);
}

async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`,{ email, password });
  localStorage.setItem(tokenKey, data.token);
}

async function signup(data) {
  await http.post(`${apiUrl}/users`, data);
}

const service = { login, logout,  user, jwt, signup };
export default service;

