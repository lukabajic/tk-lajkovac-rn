import { SERVER_URL, API } from "../../variables";
import * as actionTypes from "./actionTypes";
import { userSuccess } from "./user";

export const authStart = () => ({ type: actionTypes.AUTH_START });

export const authSuccess = (token) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
});

export const authFail = (error) => ({ type: actionTypes.AUTH_FAIL, error });

export const logout = () => ({ type: actionTypes.LOGOUT });

export const authClearError = () => ({ type: actionTypes.AUTH_CLEAR_ERROR });

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
      const { token, user /* + expiresIn */ } = data;

      dispatch(userSuccess(user));
      dispatch(authSuccess(token));
      // add expiration
    } else {
      dispatch(authFail(data.error));
    }
  } catch (err) {
    dispatch(authFail(err));
  }
};
