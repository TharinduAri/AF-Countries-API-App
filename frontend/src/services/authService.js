const API_URL = 'https://af-countries-api-app-production.up.railway.app/api/users/';

export const authService = {
  register: async (username, email, password) => {
    const response = await fetch(API_URL + 'register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: username, email, password }),
    });
    return await response.json();
  },

  login: async (email, password) => {
    const response = await fetch(API_URL + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  },
};