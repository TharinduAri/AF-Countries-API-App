const API_URL = 'https://af-countries-api-app-production.up.railway.app/api/users/';

export const authService = {
  register: async (username, email, password) => {
    try {
      const response = await fetch(`${API_URL}register`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, email, password }),
        // Add mode to handle CORS issues
        mode: 'cors',
        credentials: 'include',
      });
      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Network or server error' };
    }
  },

  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        // Add mode to handle CORS issues
        mode: 'cors',
        credentials: 'include',
      });
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network or server error' };
    }
  },
};