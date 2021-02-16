import { useRef } from "react";
import { Animated, Easing } from "react-native";

export const useInitialValue = (initialValue) => {
  const value = useRef(new Animated.Value(initialValue)).current;
  return value;
};

export const animateTiming = (value, toValue, duration = 250) => {
  Animated.timing(value, {
    toValue,
    duration,
    easing: Easing.ease,
    useNativeDriver: true,
  }).start();
};
