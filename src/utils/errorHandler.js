/**
 * Error handling utilities for consistent error management
 */

// Error types
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  API: 'API_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR',
};

// Custom error class
export class AppError extends Error {
  constructor(message, type = ERROR_TYPES.UNKNOWN, details = null) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.details = details;
  }
}

// Error handler function
export const handleApiError = (error, context = '') => {
  let errorDetails = {
    message: 'An unexpected error occurred',
    type: ERROR_TYPES.UNKNOWN,
    context,
  };

  if (error.response) {
    // Server responded with error status
    errorDetails = {
      message: error.response.data?.message || `Server error: ${error.response.status}`,
      type: ERROR_TYPES.API,
      status: error.response.status,
      data: error.response.data,
      context,
    };
  } else if (error.request) {
    // Network error
    errorDetails = {
      message: 'Network error. Please check your connection.',
      type: ERROR_TYPES.NETWORK,
      context,
    };
  } else {
    // Other error
    errorDetails = {
      message: error.message || 'An unexpected error occurred',
      type: ERROR_TYPES.UNKNOWN,
      context,
    };
  }

  // Log error for debugging
  console.error(`[${context}] Error:`, errorDetails);

  return errorDetails;
};

// Loading states manager
export const createLoadingState = () => {
  return {
    isLoading: false,
    error: null,
    data: null,
  };
};

// Generic async action handler
export const handleAsyncAction = async (action, onStart, onSuccess, onError) => {
  try {
    onStart();
    const result = await action();
    onSuccess(result);
    return result;
  } catch (error) {
    const errorDetails = handleApiError(error);
    onError(errorDetails);
    throw errorDetails;
  }
};