import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import screenOptions from "../utils/screenOptions";
import Users from "../screens/main/Users";
import MenuButton from "../components/MenuButton";

const Stack = createStackNavigator();

const UsersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        ...screenOptions,
        headerLeft: () => <MenuButton navigation={navigation} />,
      })}
    >
      <Stack.Screen name="Users" component={Users} options={{ title: false }} />
    </Stack.Navigator>
  );
};

export default UsersStack;
