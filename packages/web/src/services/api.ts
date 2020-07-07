import axios from 'axios';

require('dotenv').config();

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://684e3e5a235f.ngrok.io'
      : 'http://localhost:3333',
});

export default api;
