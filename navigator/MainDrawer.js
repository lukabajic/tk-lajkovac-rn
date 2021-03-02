import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import IndexStack from "./IndexStack";
import ScheduleDaysTabs from "./ScheduleDaysTabs";
import UsersStack from "./UsersStack";
import screenOptions from "../utils/screenOptions";
import { TitleOne } from "../components/Typography";
import Colors from "../utils/colors";
import { logout } from "../store/actions";

const Drawer = createDrawerNavigator();

const UserInfo = connect((state) => ({ user: state.user.user }))(({ user }) => (
  <View style={styles.user}>
    <TitleOne>{user.data.displayName.split(" ")[0]} </TitleOne>
    <TitleOne style={{ color: Colors.primary }}>
      {user.data.displayName.split(" ")[1]}
    </TitleOne>
  </View>
));

const BottomItems = connect(null, { logout })(({ logout }) => (
  <View style={styles.bottom}>
    <TouchableOpacity style={[styles.bottomItem, styles.bottomItemNotLast]}>
      <Ionicons name="cog-outline" size={28} color={Colors.darkGray} />
    </TouchableOpacity>
    <TouchableOpacity style={[styles.bottomItem, styles.bottomItemNotLast]}>
      <Ionicons name="ios-help-outline" size={28} color={Colors.darkGray} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.bottomItem} onPress={logout}>
      <Ionicons name="log-out-outline" size={28} color={Colors.darkGray} />
    </TouchableOpacity>
  </View>
));

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <UserInfo />
    <View style={styles.list}>
      <DrawerItemList {...props} />
    </View>
    <BottomItems />
  </DrawerContentScrollView>
);

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      drawerContentOptions={{
        activeTintColor: Colors.black,
        inactiveTintColor: Colors.darkGray,
        activeBackgroundColor: Colors.lightGray,
      }}
      drawerContent={(props) => CustomDrawerContent(props)}
    >
      <Drawer.Screen
        name="IndexStack"
        component={IndexStack}
        options={{
          title: "Početna",
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ScheduleDaysTabs"
        component={ScheduleDaysTabs}
        options={{
          title: "Raspored",
          drawerIcon: ({ color }) => (
            <Ionicons name="calendar-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="UsersStack"
        component={UsersStack}
        options={{
          title: "Članovi",
          drawerIcon: ({ color }) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  user: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 32,
    paddingBottom: 32,
    paddingLeft: 8,
    marginHorizontal: 16,
    borderBottomColor: "rgba(38, 35, 34, 0.2)",
    borderBottomWidth: 1,
  },
  list: {
    borderBottomColor: "rgba(38, 35, 34, 0.2)",
    borderBottomWidth: 1,
    marginBottom: 32,
    marginHorizontal: 16,
    paddingBottom: 32,
  },
  bottom: {
    marginHorizontal: 16,
    paddingBottom: 32,
    flexDirection: "row",
  },
  bottomItem: {
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomItemNotLast: {
    borderRightColor: "rgba(38, 35, 34, 0.2)",
    borderRightWidth: 1,
  },
});

export default MainDrawer;
