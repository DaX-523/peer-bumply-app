import AsyncStorage from '@react-native-async-storage/async-storage';

// Base API configuration
const API_BASE_URL = 'http://localhost:8000';

// Generic API request function with automatic token handling
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> => {
  try {
    // Get token from AsyncStorage
    const token = await AsyncStorage.getItem('token');

    // Prepare headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    // Add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Make the request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include', // Include cookies for any additional cookie-based auth
    });

    return response;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Convenience methods for different HTTP methods
export const apiGet = (endpoint: string, options: RequestInit = {}) =>
  apiRequest(endpoint, {...options, method: 'GET'});

export const apiPost = (
  endpoint: string,
  data?: any,
  options: RequestInit = {},
) =>
  apiRequest(endpoint, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });

export const apiPut = (
  endpoint: string,
  data?: any,
  options: RequestInit = {},
) =>
  apiRequest(endpoint, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });

export const apiDelete = (endpoint: string, options: RequestInit = {}) =>
  apiRequest(endpoint, {...options, method: 'DELETE'});

// Function to clear token (for logout)
export const clearAuthToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
    console.log('Token cleared successfully');
  } catch (error) {
    console.error('Error clearing token:', error);
  }
};

// Function to check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('token');
    return !!token;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

// Function to get current token
export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};
