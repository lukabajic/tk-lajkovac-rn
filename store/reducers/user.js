import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  error: null,
  loading: false,
  loadingMore: false,
  users: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USERS_LOAD_MORE:
      return {
        ...state,
        error: null,
        loadingMore: true,
      };
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
    case actionTypes.USERS_SUCCESS:
      const old = state.users || [];
      return {
        ...state,
        users: [...old, ...action.users],
        loadingMore: false,
        error: null,
        loading: false,
      };
    case actionTypes.USER_FAIL:
      return {
        ...state,
        error: action.error,
        loadingMore: true,
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
    case actionTypes.UPDATE_USER:
      if (!state.users) return state;

      const newUsers = [...state.users];
      const index = newUsers.findIndex((u) => u.userId === action.user.userId);

      newUsers[index] = action.user;

      return {
        ...state,
        users: newUsers,
      };
    default:
      return state;
  }
};

export default reducer;
