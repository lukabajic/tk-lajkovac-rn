import React, { useEffect } from "react";
import { Pressable, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useIsDrawerOpen } from "@react-navigation/drawer";

import Colors from "../utils/colors";
import { animateTiming, useInitialValue } from "../utils/animate";

const IconButton = ({ onPress, style, iconName }) => {
  const shadowOpacity = useInitialValue(0.2);
  const shadowRadius = useInitialValue(4);
  const elevation = useInitialValue(5);
  const shadowOffsetHeight = useInitialValue(2);
  const shadowOffsetWidth = useInitialValue(1);
  const backgroundColor = useInitialValue(0);

  const isDrawerOpen = useIsDrawerOpen();

  useEffect(() => {
    isDrawerOpen && handlePressOut();
  }, [isDrawerOpen]);

  const handlePressIn = () => {
    animateTiming(shadowOpacity, 0, 100);
    animateTiming(shadowRadius, 0, 100);
    animateTiming(elevation, 0, 100);
    animateTiming(shadowOffsetHeight, 0, 100);
    animateTiming(shadowOffsetWidth, 0, 100);
    animateTiming(backgroundColor, 0.2, 100);
  };

  const handlePressOut = () => {
    animateTiming(shadowOpacity, 0.2, 100);
    animateTiming(shadowRadius, 4, 100);
    animateTiming(elevation, 5, 100);
    animateTiming(shadowOffsetHeight, 2, 100);
    animateTiming(shadowOffsetWidth, 1, 100);
    animateTiming(backgroundColor, 0, 100);
  };

  return (
    <Animated.View
      style={{
        shadowOffset: {
          height: shadowOffsetHeight,
          width: shadowOffsetWidth,
        },
        shadowOpacity: shadowOpacity,
        shadowRadius: shadowRadius,
        elevation: elevation,
      }}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={{ ...styles.wrapper, style }}
      >
        <Ionicons name={iconName} size={24} color={Colors.darkGray} />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#262322",
    backgroundColor: Colors.white,
  },
});

export default IconButton;