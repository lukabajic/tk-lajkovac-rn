import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

import ScheduleStack from './ScheduleStack';
import Colors from '../utils/colors';
import { getBackendDate } from '../utils/getDate';
import { LargeTitle, Headline } from '../components/Typography';
import CallNumber from '../components/CallNumber';
import MenuButton from '../components/MenuButton';
import screenOptions from '../utils/screenOptions';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const NotPossibleStack = () => (
  <Stack.Navigator
    screenOptions={({ navigation }) => ({
      ...screenOptions,
      headerLeft: () => <MenuButton navigation={navigation} />,
    })}
  >
    <Stack.Screen
      name="NotPossible"
      component={NotPossible}
      options={{ title: false }}
    />
  </Stack.Navigator>
);

const NotPossible = () => {
  const oClock = new Date().getHours();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.wrapper}>
        <LargeTitle style={[styles.center, styles.marginBottom]}>
          TK Lajkovac
        </LargeTitle>
        <Headline style={styles.center}>
          {oClock >= 0 && oClock <= 1 ? (
            <Text>
              <Text style={{ color: Colors.red }}>Napomena:</Text> Naš server
              nije dostupan na kratko posle ponoći između svakog dana radi
              održavanja.
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginBottom: {
    marginBottom: 12,
  },
  center: {
    textAlign: 'center',
  },
});

const ScheduleDayBottom = connect((state) => ({
  schedule: state.schedule.schedule,
  user: state.user.user,
}))(({ schedule, user }) => {
  const yesterdayDate = getBackendDate(-1);
  const hasYesterday = Boolean(schedule?.find((d) => d.date === yesterdayDate));

  if (hasYesterday) return <NotPossibleStack />;

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
      {user.isAdmin && (
        <Tab.Screen
          name="Prekosutra"
          component={ScheduleStack}
          initialParams={{ day: 2 }}
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
      )}
    </Tab.Navigator>
  );
});

export default ScheduleDayBottom;
