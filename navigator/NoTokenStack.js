import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NoTokenIndex from "../screens/auth/NoTokenIndex";
import SignUp from "../screens/auth/SignUp";
import SignIn from "../screens/auth/SignIn";
import screenOptions from "../utils/screenOptions";

const Stack = createStackNavigator();

const NoTokenStack = () => {
  return (
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
  );
};

export default NoTokenStack;
