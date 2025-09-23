import {
  DELETE_FLIGHTS,
  FETCH_FLIGHTS,
  FLIGHT_FAILURE,
  FLIGHT_REQUEST,
  GET_FLIGHT_SUCCESS,
  POST_FLIGHT_SUCCESS,
} from "./actionType";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  error: null,
  success: false,
};

export const FlightReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FLIGHT_REQUEST:
      return { 
        ...state, 
        isLoading: true, 
        isError: false, 
        error: null,
        success: false 
      };

    case FLIGHT_FAILURE:
      return { 
        ...state, 
        isLoading: false,
        isError: true, 
        error: payload,
        success: false 
      };

    case GET_FLIGHT_SUCCESS:
      return { 
        ...state, 
        isLoading: false, 
        isError: false,
        error: null,
        flight: payload,
        success: true 
      };

    case POST_FLIGHT_SUCCESS:
      return { 
        ...state, 
        isLoading: false, 
        isError: false,
        error: null,
        success: true 
      };

    case FETCH_FLIGHTS:
      return { 
        ...state, 
        isLoading: false, 
        isError: false,
        error: null,
        data: payload,
        success: true 
      };

    case DELETE_FLIGHTS: {
      const filterFlight = state.data.filter((ele) => ele.id !== payload);
      return { 
        ...state, 
        data: filterFlight,
        success: true 
      };
    }

    default:
      return state;
  }
};
