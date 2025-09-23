import {
  HOTEL_FAILURE,
  HOTEL_REQUEST,
  GET_HOTEL_SUCCESS,
  POST_HOTEL_SUCCESS,
  NEW_GET_HOTELS_SUCCESS,
  DELETE_HOTEL,
} from "./actionType";
import { API_ENDPOINTS } from "../../config/api";
import { apiService } from "../../services/apiService";
import { handleApiError } from "../../utils/errorHandler";

export const getHotelSuccess = (payload) => {
  return { type: GET_HOTEL_SUCCESS, payload };
};

export const postHotelSuccess = (payload) => {
  return { type: POST_HOTEL_SUCCESS };
};

export const hotelRequest = () => {
  return { type: HOTEL_REQUEST };
};

export const hotelFailure = (error = null) => {
  return { type: HOTEL_FAILURE, payload: error };
};

export const fetch_hotel = (payload) => {
  return { type: NEW_GET_HOTELS_SUCCESS, payload };
};

//
export const handleDeleteHotel = (payload) => {
  return { type: DELETE_HOTEL, payload };
};

//

export const addHotel = (payload) => async (dispatch) => {
  dispatch(hotelRequest());

  try {
    await apiService.post(API_ENDPOINTS.HOTELS, payload);
    dispatch(postHotelSuccess());
  } catch (error) {
    const errorDetails = handleApiError(error, 'Add Hotel');
    dispatch(hotelFailure(errorDetails));
    throw errorDetails;
  }
};

export const fetchingHotels = (limit) => async (dispatch) => {
  dispatch(hotelRequest());
  
  try {
    const data = await apiService.get(`${API_ENDPOINTS.HOTELS}?_limit=${limit}`);
    dispatch(fetch_hotel(data));
  } catch (error) {
    const errorDetails = handleApiError(error, 'Fetch Hotels');
    dispatch(hotelFailure(errorDetails));
    throw errorDetails;
  }
};

export const DeleteHotel = (deleteId) => async (dispatch) => {
  try {
    await apiService.delete(`${API_ENDPOINTS.HOTELS}/${deleteId}`);
    dispatch(handleDeleteHotel(deleteId));
  } catch (error) {
    const errorDetails = handleApiError(error, 'Delete Hotel');
    dispatch(hotelFailure(errorDetails));
    throw errorDetails;
  }
};
