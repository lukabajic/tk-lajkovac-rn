import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { HeaderButtons } from "react-navigation-header-buttons";

import screenOptions from "../utils/screenOptions";
import Schedule from "../screens/main/Schedule";
import Booking from "../screens/main/Booking";
import { Headline } from "../components/Typography";
import getDate from "../utils/getDate";
import MenuButton from "../components/MenuButton";
import Colors from "../utils/colors";

const Stack = createStackNavigator();

const Date = ({ day }) => (
  <HeaderButtons>
    <Headline style={{ color: Colors.darkGray }}>
      {getDate(day).string}
    </Headline>
  </HeaderButtons>
);

const ScheduleStack = ({ route, loading }) => {
  const day = route.params?.day;

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Schedule"
        component={Schedule}
        options={({ navigation }) => ({
          title: false,
          headerRight: () => <Date day={day} />,
          headerLeft: () => <MenuButton navigation={navigation} />,
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

export default connect((state) => ({ loading: state.schedule.loading }))(
  ScheduleStack
);
