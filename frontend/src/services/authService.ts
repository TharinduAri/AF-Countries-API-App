const API_URL = 'http://localhost:5000/api/users/';

export const authService = {
  register: async (username: string, email: string, password: string): Promise<any> => {
    const response = await fetch(API_URL + 'register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: username, email, password }),
    });
    return await response.json();
  },

  login: async (email: string, password: string): Promise<any> => {
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