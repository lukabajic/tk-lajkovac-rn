import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NoTokenIndex from "../screens/NoTokenIndex";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import screenOptions from "../utils/screenOptions";

const Stack = createStackNavigator();

const NoTokenStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="NoTokenIndex"
          component={NoTokenIndex}
          options={{ title: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ title: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NoTokenStack;
