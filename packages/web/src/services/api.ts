import axios from 'axios';

require('dotenv').config();

console.log(process.env);

const api = axios.create({
  baseURL: process.env.SERVER_HOST || 'http://localhost:3333',
});

export default api;
