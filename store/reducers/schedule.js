import * as actionTypes from "../actions/actionTypes";

const initialState = {
  schedule: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SCHEDULE_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.SCHEDULE_SUCCESS:
      return {
        ...state,
        schedule: action.schedule,
        error: null,
        loading: false,
      };
    case actionTypes.SCHEDULE_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
