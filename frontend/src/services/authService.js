//development
//const API_URL = 'http://localhost:5000/api/users/';

//production
const API_URL = 'https://af-countries-api-app-production.up.railway.app/api/users/';


export const authService = {
  register: async (username, email, password) => {
    try {
      const response = await fetch(`${API_URL}register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, email, password }),
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
        credentials: 'include',
      });
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network or server error' };
    }
  },
  
  getMe: async (token) => {
    try {
      const response = await fetch(`${API_URL}me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('GetMe error:', error);
      return { success: false, message: 'Failed to fetch user profile' };
    }
  },
};