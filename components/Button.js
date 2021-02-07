import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

import Colors from "../utils/colors";

// android styles, ionic-like

const Button = ({ children, style, onPress, disabled, ...props }) => {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  props.default && buttonStyles.push(styles.default);
  props.square && buttonStyles.push(styles.square);
  props.elevated && buttonStyles.push(styles.elevated);

  props.primary && buttonStyles.push(styles.primary);
  props.primary && textStyles.push(styles.primaryText);

  props.secondary && buttonStyles.push(styles.secondary);
  props.secondary && textStyles.push(styles.secondaryText);

  props.tertiary && buttonStyles.push(styles.tertiary);
  props.tertiary && textStyles.push(styles.tertiaryText);

  props.fluid && buttonStyles.push(styles.fluid);

  style && buttonStyles.push(style);

  disabled && buttonStyles.push(styles.disabled);

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={textStyles}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    overflow: "hidden",
  },
  text: {
    fontSize: 16,
    letterSpacing: 0.48,
    fontWeight: "500",
    textAlign: "center",
  },
  default: {
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 2,
  },
  square: {
    padding: 24,
    borderRadius: 24,
  },
  primary: { backgroundColor: Colors.primary },
  secondary: { backgroundColor: Colors.orange },
  tertiary: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  primaryText: { color: Colors.white },
  secondaryText: { color: Colors.white },
  tertiaryText: { color: Colors.primary },
  fluid: { width: "100%" },
  elevated: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#262322",
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    backgroundColor: Colors.white,
    elevation: 1,
  },
  disabled: {
    backgroundColor: "transparent",
    borderColor: Colors.gray,
    borderWidth: 2,
  },
});

export default Button;
