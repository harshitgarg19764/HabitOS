import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(
            `${API_URL}/auth/refresh`,
            { refreshToken },
            { withCredentials: true }
          );

          const { accessToken } = response.data.data;
          localStorage.setItem('accessToken', accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (data) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data) => {
    const response = await api.post('/auth/login', data);
    if (response.data.data.accessToken) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
    }
    return response.data;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.warn('Server-side logout failed:', err);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  changePassword: async (data) => {
    const response = await api.put('/auth/change-password', data);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (data) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },
};

export const habitsAPI = {
  getAll: async (params) => {
    const response = await api.get('/habits', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/habits/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/habits', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/habits/${id}`, data);
    return response.data;
  },

  patch: async (id, data) => {
    const response = await api.patch(`/habits/${id}`, data);
    return response.data;
  },

  archive: async (id) => {
    const response = await api.patch(`/habits/${id}/archive`);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/habits/${id}`);
    return response.data;
  },

  reorder: async (habits) => {
    const response = await api.patch('/habits/reorder', { habits });
    return response.data;
  },
};

export const logsAPI = {
  getByDate: async (date) => {
    const response = await api.get('/logs', { params: { date } });
    return response.data;
  },

  getByRange: async (start, end) => {
    const response = await api.get('/logs', { params: { start, end } });
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/logs', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/logs/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/logs/${id}`);
    return response.data;
  },

  getStreak: async (habitId) => {
    const response = await api.get(`/logs/streak/${habitId}`);
    return response.data;
  },
};

export const analyticsAPI = {
  getDashboard: async () => {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  },

  getSummary: async (params) => {
    const response = await api.get('/analytics/summary', { params });
    return response.data;
  },

  getHeatmap: async (year) => {
    const response = await api.get('/analytics/heatmap', { params: { year } });
    return response.data;
  },

  getDaily: async (params) => {
    const response = await api.get('/analytics/daily', { params });
    return response.data;
  },

  export: async (format) => {
    const response = await api.get('/analytics/export', { params: { format } });
    return response.data;
  },
};

export const moodAPI = {
  get: async (date) => {
    const response = await api.get('/mood', { params: { date } });
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/mood', data);
    return response.data;
  },

  getRange: async (start, end) => {
    const response = await api.get('/mood/range', { params: { start, end } });
    return response.data;
  },
};

export const achievementsAPI = {
  getAll: async () => {
    const response = await api.get('/achievements');
    return response.data;
  },

  getLeaderboard: async () => {
    const response = await api.get('/achievements/leaderboard');
    return response.data;
  },
};

export const aiAPI = {
  getInsights: async () => {
    const response = await api.get('/ai/insights');
    return response.data;
  },

  getQuote: async (data) => {
    const response = await api.post('/ai/quote', data);
    return response.data;
  },

  getSuggestions: async () => {
    const response = await api.get('/ai/suggestions');
    return response.data;
  },

  getSummary: async () => {
    const response = await api.get('/ai/summary');
    return response.data;
  },

  getPredictions: async () => {
    const response = await api.get('/ai/predict');
    return response.data;
  },
};

export const settingsAPI = {
  getEmail: async () => {
    const response = await api.get('/settings/email');
    return response.data;
  },

  updateEmail: async (data) => {
    const response = await api.put('/settings/email', data);
    return response.data;
  },

  testEmail: async () => {
    const response = await api.post('/settings/email/test');
    return response.data;
  },
};

export default api;
