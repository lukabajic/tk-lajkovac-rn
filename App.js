import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import MainNavigator from "./navigator/MainNavigator";
import { NavigationContainer } from "@react-navigation/native";

import redux from "./store";

const store = redux().store;
const persistor = redux().persistor;

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default App;
