import React from "react";
import { Provider } from "react-redux";

import MainNavigator from "./navigator/MainNavigator";
import { NavigationContainer } from "@react-navigation/native";

import store from "./store";

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  </Provider>
);

export default App;
