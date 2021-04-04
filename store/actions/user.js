import { SERVER_URL, API } from "../../variables";
import * as actionTypes from "./actionTypes";

export const userStart = () => ({ type: actionTypes.USER_START });

export const userSuccess = (user) => ({ type: actionTypes.USER_SUCCESS, user });

export const userFail = (error) => ({ type: actionTypes.USER_FAIL, error });

export const userClearError = () => ({ type: actionTypes.USER_CLEAR_ERROR });

export const allUsersSuccess = (users) => ({
  type: actionTypes.ALL_USER_SUCCESS,
  users,
});

export const updateData = (token, action, body) => async (dispatch) => {
  dispatch(userStart());

  const URL = SERVER_URL + API + "user/edit";

  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, payload: body }),
    });
    const data = await res.json();

    if (!data.error) {
      dispatch(userSuccess(data.user));
      return true;
    } else {
      dispatch(userFail(data.error));
      return false;
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

export const fetchAllUsers = (token) => async (dispatch) => {
  dispatch(userStart());

  const URL = SERVER_URL + API + "user/get-all";

  try {
    const res = await fetch(URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!data.error) {
      const { users } = data;
      dispatch(allUsersSuccess(users));
    } else {
      dispatch(userFail(data.error));
    }
  } catch (err) {
    dispatch(userFail(err.message || err));
  }
};

export const resendEmailVerification = (token) => async (dispatch) => {
  dispatch(userStart());

  const URL = SERVER_URL + API + "user/resend";

  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!data.error) {
      dispatch(userFail(null));
    } else {
      dispatch(userFail(data.error));
    }
  } catch (err) {
    dispatch(userFail(err.message || err));
  }
};

export const resetPassword = (email) => async (dispatch) => {
  dispatch(userStart());

  const URL = SERVER_URL + API + "user/reset-password";

  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

    if (!data.error) {
      dispatch(userFail(null));
      return true;
    } else {
      dispatch(userFail(data.error));
    }
  } catch (err) {
    dispatch(userFail(err.message || err));
  }
};

export const updateUser = (user) => ({ type: actionTypes.UPDATE_USER, user });
