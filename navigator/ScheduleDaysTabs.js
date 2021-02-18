import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ScheduleStack from "./ScheduleStack";
import Colors from "../utils/colors";

const Tab = createBottomTabNavigator();

const ScheduleDayBottom = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: Colors.darkGray,
      }}
    >
      <Tab.Screen
        name="Danas"
        component={ScheduleStack}
        initialParams={{ day: 0 }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="today-outline"
              size={24}
              color={focused ? Colors.primary : Colors.darkGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Sutra"
        component={ScheduleStack}
        initialParams={{ day: 1 }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="today-outline"
              size={24}
              color={focused ? Colors.primary : Colors.darkGray}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ScheduleDayBottom;
