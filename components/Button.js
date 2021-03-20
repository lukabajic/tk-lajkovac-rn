import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

import Colors from "../utils/colors";

// android styles, ionic-like

const Button = ({ children, style, onPress, disabled, ...props }) => {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  props.default && buttonStyles.push(styles.default);
  props.square && buttonStyles.push(styles.square);

  props.primary && buttonStyles.push(styles.primary);
  props.primary && textStyles.push(styles.primaryText);

  props.secondary && buttonStyles.push(styles.secondary);
  props.secondary && textStyles.push(styles.secondaryText);

  props.tertiary && buttonStyles.push(styles.tertiary);
  props.tertiary && textStyles.push(styles.tertiaryText);

  props.fluid && buttonStyles.push(styles.fluid);

  style && buttonStyles.push(style);

  disabled && buttonStyles.push(styles.disabled);
  disabled && textStyles.push(styles.disabledText);

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
    borderWidth: 2,
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
  primary: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  secondary: { backgroundColor: Colors.orange, borderColor: Colors.orange },
  tertiary: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
  },
  primaryText: { color: Colors.white },
  secondaryText: { color: Colors.white },
  tertiaryText: { color: Colors.primary },
  fluid: { width: "100%" },
  disabled: {
    backgroundColor: "transparent",
    borderColor: Colors.gray,
    borderWidth: 2,
  },
  disabledText: { color: Colors.gray },
});

export default Button;
