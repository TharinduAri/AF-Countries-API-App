const API_URL = 'https://af-countries-api-app-production.up.railway.app/api/users/';

import axios from 'axios';

export const authService = {
  // New account signup
  register: async (username: string, email: string, password: string): Promise<any> => {
    const response = await axios.post(`${API_URL}register`, {
      name: username,
      email,
      password
    });
    return response.data;
  },

  // Login
  login: async (email: string, password: string): Promise<any> => {
    const response = await axios.post(`${API_URL}login`, {
      email,
      password
    });
    return response.data;
  },
};