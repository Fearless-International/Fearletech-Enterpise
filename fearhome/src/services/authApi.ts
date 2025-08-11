import axios from 'axios';

// Define interfaces for the auth system
export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  email: string;
  password: string;
  token: string;
}

export interface LoginResponse {
  token: string;
  user?: any; // Customize based on your actual API response
}

// Create axios instance with base URL of your Strapi backend
const api = axios.create({
  baseURL: (import.meta as any).env.VITE_STRAPI_API_URL || 'https://api.fearlessint.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set JWT token for authenticated requests
export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// Check if token exists on app load
export const loadAuthToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
    return token;
  }
  return null;
};

// Registration function
export const registerUser = async (formData: RegisterData) => {
  try {
    const response = await api.post('/auth/register', {
      data: {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login function
export const loginUser = async (credentials: LoginData): Promise<LoginResponse> => {
    try {
        console.log("Login request sending:", credentials);
        
        // Fix: Send credentials in correct format - no 'data' wrapping
        const response = await api.post<LoginResponse>(
            '/auth/login', 
            credentials  // Change from { data: credentials } to just credentials
        );
        
        console.log("Login response received:", response.data);
        
        // Check the structure of the response
        if (!response.data.token) {
            throw new Error("No token received from server");
        }
        
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        return response.data;
    } catch (error: any) {
        console.error("API login failed:", error);
        throw error;
    }
};
// Password reset request
export const requestPasswordReset = async (email: string) => {
  try {
    const response = await api.post('/auth/request-reset', {
      data: {
        email: email
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error requesting password reset:', error);
    throw error;
  }
};

// Reset password with token
export const resetPassword = async (formData: ResetPasswordData) => {
  try {
    const response = await api.post('/auth/reset-password', {
      data: {
        email: formData.email,
        password: formData.password,
        token: formData.token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

// Verify email with token
export const verifyEmail = async (token: string) => {
  try {
    const response = await api.get(`/auth/verify-email?token=${token}`);
    return response.data;
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
};

// Get current user data
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

// Add this new function to your existing authApi.ts file
export const logoutUser = (): void => {
  try {
    // Clear all auth-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // You can optionally make an API call to invalidate the token on server side
    // await api.post('/auth/logout');
    
    console.log('User logged out successfully');
    
    // Redirect to sign-in page (adjust path as needed)
    window.location.href = '/sign-in';
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
