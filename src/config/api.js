/**
 * Central API configuration
 * All API endpoints are defined here to enable easy switching between environments
 */

// Environment variables with fallbacks
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
const EXTERNAL_API_BASE_URL = process.env.REACT_APP_EXTERNAL_API_BASE_URL || 'https://happy-sunglasses-eel.cyclic.app';

// API endpoints configuration
export const API_ENDPOINTS = {
  // Local/Primary API endpoints
  FLIGHTS: `${API_BASE_URL}/flight`,
  HOTELS: `${API_BASE_URL}/hotel`,
  USERS: `${API_BASE_URL}/users`,
  GIFTCARDS: `${API_BASE_URL}/giftcards`,
  THINGS_TODO: `${API_BASE_URL}/Things_todo`,
  
  // External API endpoints (for deployed services)
  EXTERNAL_HOTELS: `${EXTERNAL_API_BASE_URL}/hotel`,
  EXTERNAL_THINGS_TODO: `${EXTERNAL_API_BASE_URL}/Things_todo`,
};

// API configuration object
export const API_CONFIG = {
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
};

// Environment check
export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';

// Helper function to get appropriate endpoint based on environment
export const getApiEndpoint = (endpoint) => {
  if (isProduction && API_ENDPOINTS[`EXTERNAL_${endpoint}`]) {
    return API_ENDPOINTS[`EXTERNAL_${endpoint}`];
  }
  return API_ENDPOINTS[endpoint];
};