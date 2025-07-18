import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.digitaleduca.com.vc/', 
  headers: {
    'Content-Type': 'application/json',

  },
});


export default api;