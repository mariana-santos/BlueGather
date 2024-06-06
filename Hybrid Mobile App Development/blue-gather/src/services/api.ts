import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://bluegather-production.up.railway.app',
});

export const mapsApi = axios.create({
  baseURL: 'http://maps.googleapis.com/maps/api/',
});
