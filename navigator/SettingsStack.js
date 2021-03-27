import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import screenOptions from "../utils/screenOptions";
import MenuButton from "../components/MenuButton";
import UserAllSettings from "../screens/user/UserAllSettings";
import ChangeName from "../screens/user/ChangeName";

const Stack = createStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="UserAllSettings"
        component={UserAllSettings}
        options={({ navigation }) => ({
          title: false,
          headerLeft: () => <MenuButton navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ChangeName"
        component={ChangeName}
        options={{ title: false }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
