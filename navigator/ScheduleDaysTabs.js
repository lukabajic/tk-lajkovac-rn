import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

import ScheduleStack from "./ScheduleStack";
import Colors from "../utils/colors";
import { getBackendDate } from "../utils/getDate";
import { LargeTitle, Headline } from "../components/Typography";
import CallNumber from "../components/CallNumber";
import IconButton from "../components/IconButton";

const Tab = createBottomTabNavigator();

const NotPossible = ({ navigation }) => {
  const oClock = new Date().getHours();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.wrapper}>
        <IconButton
          menuButton
          onPress={() => navigation.openDrawer()}
          iconName="ios-menu"
          contentContainerStyle={{ position: "absolute", top: 6, left: 16 }}
        />
        <LargeTitle style={[styles.center, styles.marginBottom]}>
          TK Lajkovac
        </LargeTitle>
        <Headline style={styles.center}>
          {oClock >= 0 && oClock <= 1 ? (
            <Text>
              <Text style={{ color: Colors.red }}>Napomena:</Text> Naš server
              nije dostupan između 00.00 i 01.00 svakog dana radi održavanja.
            </Text>
          ) : (
            <Text>
              Zakazivanje termina na našim terenima trenutno nije moguće.
              Probajte opet malo kasnije. Ukoliko uporno dobijate ovu poruku.
              Možete koristi <CallNumber /> da zakažete termin.
            </Text>
          )}
        </Headline>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  wrapper: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  marginBottom: {
    marginBottom: 12,
  },
  center: {
    textAlign: "center",
  },
});

const ScheduleDayBottom = connect((state) => ({
  schedule: state.schedule.schedule,
}))(({ schedule, navigation }) => {
  const yesterdayDate = getBackendDate(-1);
  const hasYesterday = Boolean(schedule?.find((d) => d.date === yesterdayDate));

  if (hasYesterday) return <NotPossible navigation={navigation} />;

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
});

export default ScheduleDayBottom;
