import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";

import screenOptions from "../utils/screenOptions";
import MenuButton from "../components/MenuButton";

const Stack = createStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        ...screenOptions,
        headerLeft: () => <MenuButton navigation={navigation} />,
      })}
    >
      <Stack.Screen
        name="Settings"
        component={() => (
          <View>
            <Text>Settings</Text>
          </View>
        )}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
