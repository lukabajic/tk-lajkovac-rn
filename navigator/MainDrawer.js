import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import IndexStack from "./IndexStack";
import screenOptions from "../utils/screenOptions";

const Drawer = createDrawerNavigator();

const NoTokenDrawer = () => {
  return (
    <Drawer.Navigator screenOptions={screenOptions}>
      <Drawer.Screen
        name="IndexStack"
        component={IndexStack}
        options={{ title: "Početna" }}
      />
    </Drawer.Navigator>
  );
};

export default NoTokenDrawer;
