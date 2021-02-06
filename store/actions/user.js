import * as actionTypes from "./actionTypes";

export const userStart = () => ({ type: actionTypes.USER_START });

export const userSuccess = (user) => ({ type: actionTypes.USER_SUCCESS, user });

export const userFail = (error) => ({ type: actionTypes.USER_FAIL, error });
