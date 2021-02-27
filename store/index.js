import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import thunk from "redux-thunk";

// reducers
import authReducer from "./reducers/auth";
import userReducer from "./reducers/user";
import scheduleReducer from "./reducers/schedule";

const persistConfig = {
  key: "auth",
  storage: AsyncStorage,
};

// combining reducers
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  user: userReducer,
  schedule: scheduleReducer,
});

export default () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);

  return { store, persistor };
};
