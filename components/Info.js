import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Colors from "../utils/colors";

const Info = ({ style = {}, label, value }) => (
  <View style={[styles.wrapper, style]}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "transparent",
    position: "relative",
    height: 50,
  },
  label: {
    position: "absolute",
    fontSize: 10,
    letterSpacing: 1.28,
    fontWeight: "800",
    lineHeight: 10,
    textTransform: "uppercase",
    top: 5,
    left: 5,
    color: Colors.darkGray,
  },
  value: {
    position: "absolute",
    top: 20,
    left: 5,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: "center",
    letterSpacing: 1.28,
    fontWeight: "700",
    color: Colors.black,
  },
});

export default Info;
