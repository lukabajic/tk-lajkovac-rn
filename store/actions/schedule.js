import { SERVER_URL, API } from "../../variables";
import * as actionTypes from "./actionTypes";
import { userSuccess } from "./user";
import { getBackendDate } from "../../utils/getDate";

const scheduleStart = () => ({ type: actionTypes.SCHEDULE_START });

export const scheduleSuccess = (schedule) => ({
  type: actionTypes.SCHEDULE_SUCCESS,
  schedule,
});

const scheduleFail = (error) => ({ type: actionTypes.SCHEDULE_FAIL, error });

export const fetchSchedule = (token) => async (dispatch) => {
  dispatch(scheduleStart());

  const URL = SERVER_URL + API + "schedule-day/get-all";

  try {
    const res = await fetch(URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!data.error) {
      const { scheduleDays } = data;
      dispatch(scheduleSuccess(scheduleDays));
    } else {
      dispatch(scheduleFail(data.error));
    }
  } catch (err) {
    dispatch(scheduleFail(err.message || err));
  }
};

export const scheduleTime = (token, court, time, day, action = "") => async (
  dispatch,
  getState
) => {
  dispatch(scheduleStart());

  const URL = SERVER_URL + API + "schedule-day/edit";
  const days = ["today", "tomorrow", "dayAfter"];

  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        court,
        time,
        day: days[day],
        action,
      }),
    });

    const data = await res.json();

    if (!data.error) {
      const schedule = [...getState().schedule.schedule];

      const { editedUser, editedScheduleDay } = data;

      const index = schedule.findIndex((d) => d.date === getBackendDate(day));
      schedule[index] = editedScheduleDay;

      dispatch(scheduleSuccess(schedule));
      dispatch(userSuccess(editedUser));
      return data.message;
    } else {
      dispatch(scheduleFail(data.error));
      return false;
    }
  } catch (err) {
    dispatch(scheduleFail(err.message || err));
  }
};
