import React from "react";
import { StyleSheet, Text, View } from "react-native";

import NoTokenStack from "./navigator/NoTokenNavigator";
import SignUp from "./screens/SignUp";

export default function App({ token }) {
  if (!token) return <NoTokenStack />;
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
