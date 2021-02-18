import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import screenOptions from "../utils/screenOptions";
import Users from "../screens/main/Users";
import IconButton from "../components/IconButton";

const Stack = createStackNavigator();

const UsersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        ...screenOptions,
        headerLeft: () => (
          <IconButton
            onPress={() => navigation.openDrawer()}
            iconName="ios-menu"
          />
        ),
        headerLeftContainerStyle: { paddingLeft: 16, paddingTop: 16 },
      })}
    >
      <Stack.Screen name="Users" component={Users} options={{ title: false }} />
    </Stack.Navigator>
  );
};

export default UsersStack;
