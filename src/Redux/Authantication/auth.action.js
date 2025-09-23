import {
  GET_USERS,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESSFUL,
  LOGOUT_USER,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESSFUL,
} from "./auth.actionType";
import { API_ENDPOINTS } from "../../config/api";
import { apiService } from "../../services/apiService";
import { handleApiError } from "../../utils/errorHandler";

export const login_request = () => {
  return { type: LOGIN_REQUEST };
};

export const login_success = (payload) => {
  return { type: LOGIN_SUCCESSFUL, payload };
};
export const login_error = (error = null) => {
  return { type: LOGIN_ERROR, payload: error };
};

export const register_request = () => {
  return { type: REGISTER_REQUEST };
};

export const register_success = (payload) => {
  return { type: REGISTER_SUCCESSFUL, payload };
};
export const register_error = (error = null) => {
  return { type: REGISTER_ERROR, payload: error };
};

export const get_users = (payload) => {
  return { type: GET_USERS, payload };
};

export const handlelogout_user = () => {
  return { type: LOGOUT_USER };
};

export const userRigister = (userData) => async (dispatch) => {
  dispatch(register_request());
  
  try {
    const data = await apiService.post(API_ENDPOINTS.USERS, userData);
    dispatch(register_success(data));
  } catch (error) {
    const errorDetails = handleApiError(error, 'User Registration');
    dispatch(register_error(errorDetails));
    throw errorDetails;
  }
};

// get users
export const fetch_users = () => async (dispatch) => {
  dispatch(register_request());
  
  try {
    const data = await apiService.get(API_ENDPOINTS.USERS);
    dispatch(get_users(data));
  } catch (error) {
    const errorDetails = handleApiError(error, 'Fetch Users');
    dispatch(register_error(errorDetails));
    throw errorDetails;
  }
};

// Logint funcnality

export const login_user = (loginData) => (dispatch) => {
  dispatch(login_success(loginData));
  // localStorage.setItem("MkuserData", JSON.stringify(loginData));
  // localStorage.setItem("MkisAuth", JSON.stringify(true));
};

export const logout_user = (dispatch) => {
  dispatch(handlelogout_user());
  localStorage.setItem("MkuserData", JSON.stringify({}));
  localStorage.setItem("MkisAuth", JSON.stringify(false));
};
