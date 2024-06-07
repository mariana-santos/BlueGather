import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://bluegather-production.up.railway.app/',
});
