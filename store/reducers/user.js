import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: null,
  error: null,
  loading: false,
  users: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        error: null,
        loading: false,
      };
    case actionTypes.ALL_USER_SUCCESS:
      return {
        ...state,
        users: action.users,
        error: null,
        loading: false,
      };
    case actionTypes.USER_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case actionTypes.USER_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
