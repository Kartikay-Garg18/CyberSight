import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cybersight.onrender.com/api',
  timeout: 10000,
});

export default api;
