import {
  SELECTED_DATE_AND_CITY,
  SELECTED_CITY,
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

//Pick date and city for storing into redux store

export const selectDateAndCity = (checkInDate,checkOutDate) => {
  return { type: SELECTED_DATE_AND_CITY, payload: { checkInDate, checkOutDate } };
};
export const selectCity = (selectedCity) => {
  return { type: SELECTED_CITY, payload: { selectedCity } };
};

export const addHotel = (payload) => async (dispatch) => {
  dispatch(hotelRequest());

  try {
    await apiService.post(API_ENDPOINTS.EXTERNAL_HOTELS, payload);
    dispatch(postHotelSuccess());
  } catch (error) {
    const errorDetails = handleApiError(error, 'Add Hotel (External)');
    dispatch(hotelFailure(errorDetails));
    throw errorDetails;
  }
};

//https://happy-sunglasses-eel.cyclic.app/hotel?_sort=asc&_order=price&page=1&_limit=20
export const fetchingHotels = (sort, order, page) => async (dispatch) => {
  console.log(order, sort, page);
  dispatch({ type: HOTEL_REQUEST });
  
  try {
    const data = await apiService.get(
      `${API_ENDPOINTS.EXTERNAL_HOTELS}?_sort=${sort}&_order=${order}&_page=${page}&_limit=20`
    );
    console.log(data);
    dispatch({ type: GET_HOTEL_SUCCESS, payload: data });
  } catch (error) {
    const errorDetails = handleApiError(error, 'Fetch Hotels (External)');
    dispatch({ type: HOTEL_FAILURE, payload: errorDetails });
    throw errorDetails;
  }
};





//

export const DeleteHotel = (deleteId) => async (dispatch) => {
  try {
    await apiService.delete(`${API_ENDPOINTS.EXTERNAL_HOTELS}/${deleteId}`);
    dispatch(handleDeleteHotel(deleteId));
  } catch (error) {
    const errorDetails = handleApiError(error, 'Delete Hotel (External)');
    dispatch(hotelFailure(errorDetails));
    throw errorDetails;
  }
};
