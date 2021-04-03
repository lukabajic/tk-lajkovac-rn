import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../utils/colors";
import colors from "../utils/colors";

const Alert = ({ type, message }) => {
  const alertStyles = [styles.wrapper];
  type === "danger"
    ? alertStyles.push(styles.danger)
    : alertStyles.push(styles.success);

  const textStyles = [styles.text];
  type === "danger"
    ? textStyles.push(styles.dangerText)
    : textStyles.push(styles.successText);

  return (
    <View style={alertStyles}>
      <Ionicons
        name="alert-circle-outline"
        size={24}
        color={type === "danger" ? colors.red : colors.primary}
      />
      <Text style={textStyles}>
        {typeof message === "string" ? message : ""}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxWidth: 320,
    borderWidth: 2,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 13,
    paddingVertical: 13,
  },
  success: {
    borderColor: Colors.primary,
  },
  danger: {
    borderColor: Colors.red,
  },
  text: {
    fontSize: 16,
    marginLeft: 6,
  },
  successText: {
    color: Colors.primary,
  },
  dangerText: {
    color: Colors.red,
  },
});

export default Alert;
