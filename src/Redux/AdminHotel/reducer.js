import {
  HOTEL_FAILURE,
  HOTEL_REQUEST,
  GET_HOTEL_SUCCESS,
  POST_HOTEL_SUCCESS,
  NEW_GET_HOTELS_SUCCESS,
  DELETE_HOTEL,
} from "./actionType";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  error: null,
  success: false,
};

export const HotelReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HOTEL_REQUEST:
      return { 
        ...state, 
        isLoading: true, 
        isError: false, 
        error: null,
        success: false 
      };

    case HOTEL_FAILURE:
      return { 
        ...state, 
        isLoading: false,
        isError: true, 
        error: payload,
        success: false 
      };

    case GET_HOTEL_SUCCESS:
      return { 
        ...state, 
        isLoading: false, 
        isError: false,
        error: null,
        hotel: payload,
        success: true 
      };

    case POST_HOTEL_SUCCESS:
      return { 
        ...state, 
        isLoading: false, 
        isError: false,
        error: null,
        success: true 
      };

    case NEW_GET_HOTELS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        error: null,
        data: payload,
        success: true
      };

    case DELETE_HOTEL: {
      const filteredHotels = state.data.filter((ele) => ele.id !== payload);
      return { 
        ...state, 
        data: filteredHotels,
        success: true 
      };
    }

    default:
      return state;
  }
};
