import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

import NoTokenStack from "./NoTokenStack";

const MainNavigator = ({ token, user }) => {
  if (!token) return <NoTokenStack />;

  const {
    data: { displayName, phone },
  } = user;

  if (!displayName || !phone)
    return (
      <View>
        <Text>Nema</Text>
        <Text>{displayName}</Text>
        <Text>{phone}</Text>
      </View>
    );

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
