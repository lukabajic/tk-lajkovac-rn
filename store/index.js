import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// reducers
import authReducer from "./reducers/auth";
import userReducer from "./reducers/user";
import scheduleReducer from "./reducers/schedule";

// combining reducers
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  schedule: scheduleReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
