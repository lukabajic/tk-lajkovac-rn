import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";

import screenOptions from "../utils/screenOptions";
import Schedule from "../screens/main/Schedule";
import Booking from "../screens/main/Booking";
import IconButton from "../components/IconButton";
import { Headline } from "../components/Typography";
import getDate from "../utils/getDate";

const Stack = createStackNavigator();

const ScheduleStack = ({ route, loading }) => {
  const day = route.params?.day;

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Schedule"
        component={Schedule}
        options={({ navigation }) => ({
          title: false,
          headerRight: () => (
            <View style={styles.date}>
              <Headline>{getDate(day).string}</Headline>
            </View>
          ),
          headerLeft: () => (
            <IconButton
              onPress={() => navigation.openDrawer()}
              iconName="ios-menu"
            />
          ),
          headerLeftContainerStyle: {
            position: "absolute",
            top: "50%",
            left: 16,
          },
        })}
        initialParams={{ day }}
      />
      <Stack.Screen
        name="Booking"
        component={Booking}
        options={{
          title: false,
          headerLeftContainerStyle: { display: loading ? "none" : "flex" },
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  date: {
    position: "absolute",
    top: "50%",
    right: 16,
  },
});

export default connect((state) => ({ loading: state.schedule.loading }))(
  ScheduleStack
);
