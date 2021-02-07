import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

import NoTokenStack from "./NoTokenStack";
import NoInfoScreen from "../screens/NoInfoScreen";
import PleaseVerifyScreen from "../screens/PleaseVerifyScreen";

const MainNavigator = ({ token, user }) => {
  if (!token) return <NoTokenStack />;

  const { displayName, phone } = user.data;

  if (!displayName || !phone) return <NoInfoScreen />;

  const { emailVerified } = user;

  if (!emailVerified) return <PleaseVerifyScreen />;

  return (
    <View style={styles.container}>
      <Text>Nešto nije uredu sa aplikacijom.</Text>
      <Text>Molim vas pozovite 0628719500 da prijavite problem.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default connect((state) => ({
  token: state.auth.token,
  user: state.user.user,
}))(MainNavigator);
