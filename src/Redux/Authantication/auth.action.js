import axios from "axios";
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

export const login_request = () => {
  return { type: LOGIN_REQUEST };
};

export const login_success = (payload) => {
  return { type: LOGIN_SUCCESSFUL, payload };
};
export const login_error = () => {
  return { type: LOGIN_ERROR };
};

export const register_request = () => {
  return { type: REGISTER_REQUEST };
};

export const register_success = (payload) => {
  return { type: REGISTER_SUCCESSFUL, payload };
};
export const register_error = () => {
  return { type: REGISTER_ERROR };
};

export const get_users = (payload) => {
  return { type: GET_USERS, payload };
};

export const handlelogout_user = () => {
  return { type: LOGOUT_USER };
};

export const userRegister = (userData) => async (dispatch) => {
  dispatch(register_request());
  try {
    const res = await axios.post(`http://localhost:8080/users`, userData);
    dispatch(register_success(res.data));
    return true;
  } catch (err) {
    dispatch(register_error());
    return false;
  }
};

// get users

export const fetch_users = () => async (dispatch) => {
   dispatch(register_request());
  try {
     const res = await axios.get(`http://localhost:8080/users`);
     dispatch(get_users(res.data));
   } catch (err) {
    dispatch(register_error());
   }
 };

// Logint funcnality

export const login_user = (userData) => (dispatch) => {
  dispatch(login_request());
  try {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => 
      u.number === userData.number || 
      u.firebaseUID === userData.firebaseUID
    );
    
    if (user) {
      dispatch(login_success(user));
      localStorage.setItem('activeUser', JSON.stringify(user));
      return true;
    } else {
      dispatch(login_error());
      return false;
    }
  } catch (error) {
    console.error('Login error:', error);
    dispatch(login_error());
    return false;
  }
};

export const logout_user = (dispatch) => {
  localStorage.setItem("MkuserData", JSON.stringify({}));
  localStorage.setItem("MkisAuth", JSON.stringify(false));

  dispatch(handlelogout_user())
};
