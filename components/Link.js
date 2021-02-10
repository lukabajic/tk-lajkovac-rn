import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";

import Colors from "../utils/colors";

const Link = ({ children, action, ...props }) => {
  const linkStyles = [styles.link];
  props.darkGray && linkStyles.push(styles.darkGray);
  props.blue && linkStyles.push(styles.blue);

  props.disabled && linkStyles.push(styles.disabled);

  props.style && linkStyles.push(props.style);

  return (
    <Pressable
      disabled={props.disabled}
      onPress={() => {
        action && action();
      }}
    >
      <Text style={linkStyles}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  link: {
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.2,
  },
  darkGray: {
    color: Colors.darkGray,
  },
  blue: {
    color: Colors.blue,
  },
  disabled: {
    color: Colors.lightGray,
  },
});

export default Link;
