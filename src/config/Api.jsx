import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.de.gdelivery.app.br', 
  headers: {
    'Content-Type': 'application/json',

  },
});


export default api;