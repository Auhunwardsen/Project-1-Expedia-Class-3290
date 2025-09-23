/**
 * Form validation utilities
 */

// Validation rules
export const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'This field is required';
    }
    return null;
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  url: (value) => {
    try {
      if (value) {
        new URL(value);
      }
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  minLength: (minLength) => (value) => {
    if (value && value.length < minLength) {
      return `Must be at least ${minLength} characters long`;
    }
    return null;
  },

  maxLength: (maxLength) => (value) => {
    if (value && value.length > maxLength) {
      return `Must be no more than ${maxLength} characters long`;
    }
    return null;
  },

  number: (value) => {
    if (value && isNaN(value)) {
      return 'Please enter a valid number';
    }
    return null;
  },

  positiveNumber: (value) => {
    if (value && (isNaN(value) || value <= 0)) {
      return 'Please enter a positive number';
    }
    return null;
  },
};

// Validate a single field
export const validateField = (value, rules = []) => {
  for (const rule of rules) {
    const error = rule(value);
    if (error) {
      return error;
    }
  }
  return null;
};

// Validate entire form
export const validateForm = (values, validationRules) => {
  const errors = {};
  let isValid = true;

  for (const [fieldName, rules] of Object.entries(validationRules)) {
    const error = validateField(values[fieldName], rules);
    if (error) {
      errors[fieldName] = error;
      isValid = false;
    }
  }

  return { errors, isValid };
};

// API response validation
export const validateApiResponse = (response, expectedFields = []) => {
  if (!response || typeof response !== 'object') {
    throw new Error('Invalid API response format');
  }

  for (const field of expectedFields) {
    if (!(field in response)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  return response;
};

// Hotel form validation rules
export const hotelValidationRules = {
  name: [validators.required, validators.minLength(2), validators.maxLength(100)],
  place: [validators.required, validators.minLength(2), validators.maxLength(50)],
  price: [validators.required, validators.positiveNumber],
  image: [validators.required, validators.url],
  description: [validators.required, validators.minLength(10), validators.maxLength(500)],
  additional: [validators.maxLength(200)],
};

// Flight form validation rules
export const flightValidationRules = {
  airline: [validators.required, validators.minLength(2), validators.maxLength(50)],
  from: [validators.required, validators.minLength(2), validators.maxLength(50)],
  to: [validators.required, validators.minLength(2), validators.maxLength(50)],
  price: [validators.required, validators.positiveNumber],
  duration: [validators.required],
};