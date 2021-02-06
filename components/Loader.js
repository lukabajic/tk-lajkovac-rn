import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

import Colors from "../utils/colors";

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator color={Colors.primary} size="large" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default Loader;
