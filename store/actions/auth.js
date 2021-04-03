import { SERVER_URL, API } from "../../variables";
import * as actionTypes from "./actionTypes";
import { userSuccess, fetchCurUser } from "./user";

export const authStart = () => ({ type: actionTypes.AUTH_START });

export const authSuccess = (token, expirationDate) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  expirationDate,
});

export const authFail = (error) => ({ type: actionTypes.AUTH_FAIL, error });

export const logout = () => ({ type: actionTypes.LOGOUT });

export const authClearError = () => ({ type: actionTypes.AUTH_CLEAR_ERROR });

const setAuthTimeout = (expiresIn) => (dispatch) => {
  setTimeout(() => dispatch(logout()), expiresIn);
};

export const auth = (action, email, password) => async (dispatch) => {
  dispatch(authStart());

  const URL = SERVER_URL + API + "auth" + action;

  try {
    const res = await fetch(URL, {
      method: action === "/register" ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!data.error) {
      const { token, user, expiresIn } = data;

      const expirationDate = new Date(new Date().getTime() + expiresIn);

      dispatch(authSuccess(token, expirationDate));
      dispatch(userSuccess(user));
      dispatch(setAuthTimeout(expiresIn));
      return true;
    } else {
      dispatch(authFail(data.error));
      return false;
    }
  } catch (err) {
    dispatch(authFail(err));
  }
};

export const checkExpiration = () => (dispatch, getState) => {
  const token = getState().auth.token;
  let expirationDate = getState().auth.expirationDate;

  expirationDate = new Date(expirationDate);

  if (expirationDate > new Date()) {
    setAuthTimeout(expirationDate.getTime() - new Date().getTime());
    dispatch(fetchCurUser(token));
  } else {
    dispatch(logout());
  }
};
