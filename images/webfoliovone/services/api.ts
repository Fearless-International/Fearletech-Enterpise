import axios from 'axios';

// Define interfaces
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

// Get token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://api.fearlessint.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth interceptor
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Contact form submission - works for both authenticated and public users
export const submitContactForm = async (formData: ContactFormData) => {
  try {
    const response = await api.post('/contacts', {
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        statuses: 'pending'
      }
    });
    console.log('Response:', response);
    console.log(formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

// Get user's contacts (requires authentication)
export const getUserContacts = async () => {
  try {
    const response = await api.get('/contacts');
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

// Get single contact (requires authentication)
export const getContact = async (id: string) => {
  try {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching contact:', error);
    throw error;
  }
};

// Authentication functions
interface LoginResponse {
  token: string;
  user: any;
}

export const login = async (data: LoginData) => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', {
      data: {
        email: data.email,
        password: data.password
      }
    });
    
    if (typeof window !== 'undefined' && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (data: RegisterData) => {
  try {
    const response = await api.post('/auth/register', {
      data: {
        fullName: data.fullName,
        email: data.email,
        password: data.password
      }
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
  api.post('/auth/logout').catch(() => {});
};

export const getCurrentUser = () => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Get contact statistics for authenticated user
export const getContactStats = async () => {
  try {
    const response = await api.get('/contacts/user-stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching contact stats:', error);
    throw error;
  }
};