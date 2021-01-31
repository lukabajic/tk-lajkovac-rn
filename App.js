import React from "react";
import { Provider } from "react-redux";

import MainNavigator from "./navigator/MainNavigator";

import store from "./store";

const App = () => (
  <Provider store={store}>
    <MainNavigator />
  </Provider>
);

export default App;
