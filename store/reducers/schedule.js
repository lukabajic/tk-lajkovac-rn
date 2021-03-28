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
    case actionTypes.UPDATE_DAY:
      if (!state.schedule) return state;

      const newSchedule = [...state.schedule];
      const index = newSchedule.findIndex(
        (d) => d.date === action.scheduleDay.date
      );

      newSchedule[index] = action.scheduleDay;

      return {
        ...state,
        ...newSchedule,
      };

    case actionTypes.CREATE_DAY:
      return {
        ...state,
        schedule: [...state.schedule, action.scheduleDay],
      };

    case actionTypes.DELETE_DAY:
      if (!state.schedule) return state;

      const filteredSchedule = state.schedule.filter(
        (d) => d.date !== action.date
      );

      return {
        ...state,
        ...filteredSchedule,
      };

    default:
      return state;
  }
};

export default reducer;
