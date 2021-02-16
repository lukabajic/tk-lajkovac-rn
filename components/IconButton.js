import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../utils/colors";

const IconButton = ({ onPress, style, iconName }) => (
  <Pressable onPress={onPress} style={{ ...styles.wrapper, ...style }}>
    <Ionicons name={iconName} size={24} color={Colors.darkGray} />
  </Pressable>
);

const styles = StyleSheet.create({
  wrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#262322",
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: Colors.white,
  },
});

export default IconButton;
