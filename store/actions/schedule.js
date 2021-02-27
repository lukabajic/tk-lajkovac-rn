import { SERVER_URL, API } from "../../variables";
import * as actionTypes from "./actionTypes";

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
      const schedule = getState().schedule.schedule;
      const userId = getState().user.user.userId;

      const backendDate = new Date(
        new Date().setDate(new Date().getDate() + day)
      ).toDateString();
      const foundDay = schedule.find((d) => d.date === backendDate);
      const foundCourt = foundDay.courts.find((c) => c.number === court);
      const foundTime = foundCourt.times.find((t) => t.start === time);
      foundTime.taken = action === "cancel" ? false : userId;
      foundTime.userId = action === "cancel" ? null : true;

      dispatch(scheduleSuccess(schedule));
      return data.message;
    } else {
      dispatch(scheduleFail(data.error));
      return false;
    }
  } catch (err) {
    dispatch(scheduleFail(err.message || err));
  }
};
