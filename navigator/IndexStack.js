import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import screenOptions from "../utils/screenOptions";
import Index from "../screens/main/Index";
import MenuButton from "../components/MenuButton";

const Stack = createStackNavigator();

const IndexStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        ...screenOptions,
        headerLeft: () => <MenuButton navigation={navigation} />,
      })}
    >
      <Stack.Screen name="Index" component={Index} options={{ title: false }} />
    </Stack.Navigator>
  );
};

export default IndexStack;
