import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true,
  timeout: 3000,
});

export default client;
