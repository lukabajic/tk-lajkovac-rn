import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import screenOptions from "../utils/screenOptions";
import Index from "../screens/main/Index";
import IconButton from "../components/IconButton";

const Stack = createStackNavigator();

const NoTokenStack = () => {
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
      <Stack.Screen name="Index" component={Index} options={{ title: false }} />
    </Stack.Navigator>
  );
};

export default NoTokenStack;
