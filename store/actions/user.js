import { SERVER_URL, API } from "../../variables";
import * as actionTypes from "./actionTypes";

export const userStart = () => ({ type: actionTypes.USER_START });

export const userSuccess = (user) => ({ type: actionTypes.USER_SUCCESS, user });

export const userFail = (error) => ({ type: actionTypes.USER_FAIL, error });

export const userClearError = () => ({ type: actionTypes.USER_CLEAR_ERROR });

export const updateData = (token, user, action, displayName, phone) => async (
  dispatch
) => {
  dispatch(userStart());

  const URL = SERVER_URL + API + "user/edit";

  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, payload: { displayName, phone } }),
    });
    const data = await res.json();

    if (!data.error) {
      dispatch(
        userSuccess({ ...user, data: { ...user.data, displayName, phone } })
      );
    } else {
      dispatch(userFail(data.error));
    }
  } catch (err) {
    dispatch(userFail(err.message || err));
  }
};

export const fetchCurUser = (token) => async (dispatch) => {
  dispatch(userStart());

  const URL = SERVER_URL + API + "user/get";

  try {
    const res = await fetch(URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!data.error) {
      const { user } = data;
      dispatch(userSuccess(user));
    } else {
      dispatch(userFail(data.error));
    }
  } catch (err) {
    dispatch(userFail(err.message || err));
  }
};
