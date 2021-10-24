import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';

import MainNavigator from './navigator/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';

import redux from './store';

const store = redux().store;
const persistor = redux().persistor;

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <MainNavigator />
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default App;
