import React from "react";
import { StyleSheet, Text } from "react-native";

import Colors from "../utils/colors";

const Link = ({ children, navigation, to, replace, ...props }) => {
  const linkStyles = [styles.link];
  props.darkGray && linkStyles.push(styles.darkGray);
  props.blue && linkStyles.push(styles.blue);

  props.style && linkStyles.push(props.style);

  return (
    <Text
      onPress={() =>
        replace ? navigation.replace(to) : navigation.navigate(to)
      }
      style={linkStyles}
    >
      {children}
    </Text>
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
});

export default Link;
