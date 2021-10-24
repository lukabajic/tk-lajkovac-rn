import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import screenOptions from '../utils/screenOptions';
import MenuButton from '../components/MenuButton';
import UserAllSettings from '../screens/user/UserAllSettings';
import ChangeName from '../screens/user/ChangeName';
import ChangePassword from '../screens/user/ChangePassword';
import ChangePhone from '../screens/user/ChangePhone';
import EmailChange from '../screens/user/EmailChange';
import ProfilePicture from '../screens/user/ProfilePicture';

const Stack = createStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="UserAllSettings"
        component={UserAllSettings}
        options={({ navigation }) => ({
          title: false,
          headerLeft: () => <MenuButton navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ChangeName"
        component={ChangeName}
        options={{ title: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ title: false }}
      />
      <Stack.Screen
        name="ChangePhone"
        component={ChangePhone}
        options={{ title: false }}
      />
      <Stack.Screen
        name="EmailChange"
        component={EmailChange}
        options={{ title: false }}
      />
      <Stack.Screen
        name="ProfilePicture"
        component={ProfilePicture}
        options={{ title: false }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
