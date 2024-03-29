import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  expirationDate: null,
  registrationProcess: false,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        expirationDate: action.expirationDate,
        error: null,
        loading: false,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        expirationDate: null,
        token: null,
      };
    case actionTypes.AUTH_REGISTRATION_PROCESS:
      return {
        ...state,
        registrationProcess: action.payload,
      };
    case actionTypes.AUTH_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
