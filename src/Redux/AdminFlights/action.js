import {
  DELETE_FLIGHTS,
  FETCH_FLIGHTS,
  FLIGHT_FAILURE,
  FLIGHT_REQUEST,
  GET_FLIGHT_SUCCESS,
  POST_FLIGHT_SUCCESS,
} from "./actionType";
import { API_ENDPOINTS } from "../../config/api";
import { apiService } from "../../services/apiService";
import { handleApiError } from "../../utils/errorHandler";

export const getFlightSuccess = (payload) => {
  return { type: GET_FLIGHT_SUCCESS, payload };
};

export const postFlightSuccess = (payload) => {
  return { type: POST_FLIGHT_SUCCESS };
};

export const flightRequest = () => {
  return { type: FLIGHT_REQUEST };
};

export const flightFailure = (error = null) => {
  return { type: FLIGHT_FAILURE, payload: error };
};

//
export const fetch_flights_product = (payload) => {
  return { type: FETCH_FLIGHTS, payload };
};
//
export const handleDeleteProduct = (payload) => {
  return { type: DELETE_FLIGHTS, payload };
};

export const addFlight = (payload) => async (dispatch) => {
  dispatch(flightRequest());

  try {
    await apiService.post(API_ENDPOINTS.FLIGHTS, payload);
    dispatch(postFlightSuccess());
  } catch (error) {
    const errorDetails = handleApiError(error, 'Add Flight');
    dispatch(flightFailure(errorDetails));
    throw errorDetails;
  }
};

//
export const fetchFlightProducts = (limit) => async (dispatch) => {
  dispatch(flightRequest());
  
  try {
    const data = await apiService.get(`${API_ENDPOINTS.FLIGHTS}?_limit=${limit}`);
    dispatch(fetch_flights_product(data));
  } catch (error) {
    const errorDetails = handleApiError(error, 'Fetch Flight Products');
    dispatch(flightFailure(errorDetails));
    throw errorDetails;
  }
};

export const DeleteFlightProducts = (deleteId) => async (dispatch) => {
  try {
    await apiService.delete(`${API_ENDPOINTS.FLIGHTS}/${deleteId}`);
    dispatch(handleDeleteProduct(deleteId));
  } catch (error) {
    const errorDetails = handleApiError(error, 'Delete Flight Product');
    dispatch(flightFailure(errorDetails));
    throw errorDetails;
  }
};
