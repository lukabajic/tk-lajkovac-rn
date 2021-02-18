import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import screenOptions from "../utils/screenOptions";
import Schedule from "../screens/main/Schedule";
import IconButton from "../components/IconButton";

const Stack = createStackNavigator();

const ScheduleStack = () => {
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
      <Stack.Screen
        name="Schedule"
        component={Schedule}
        options={{ title: false }}
      />
    </Stack.Navigator>
  );
};

export default ScheduleStack;
