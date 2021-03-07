import React from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import NoTokenIndex from "../screens/auth/NoTokenIndex";
import SignUp from "../screens/auth/SignUp";
import SignIn from "../screens/auth/SignIn";
import ResetPassword from "../screens/user/ResetPassword";
import screenOptions from "../utils/screenOptions";

const Stack = createStackNavigator();

const NoTokenStack = ({ loading }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        headerLeftContainerStyle: { display: loading ? "none" : "flex" },
      }}
    >
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
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ title: false }}
      />
    </Stack.Navigator>
  );
};

export default connect((state) => ({ loading: state.auth.loading }))(
  NoTokenStack
);
