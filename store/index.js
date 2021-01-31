import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// reducers
import authReducer from "./reducers/auth";
// import userReducer from "./reducers/user";
// import sidebarReducer from "./reducers/sidebar";
// import scheduleReducer from "./reducers/schedule";

// combining reducers
const rootReducer = combineReducers({
  auth: authReducer,
  // sidebar: sidebarReducer,
  // user: userReducer,
  // schedule: scheduleReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
