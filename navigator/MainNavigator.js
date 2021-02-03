import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

import NoTokenStack from "./NoTokenStack";

import Colors from "../utils/colors";

const MainNavigator = ({ token, loading }) => {
  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );

  if (!token) return <NoTokenStack />;

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
  loading: state.auth.loading,
}))(MainNavigator);
