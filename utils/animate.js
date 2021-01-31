import { useRef } from "react";
import { Animated, Easing } from "react-native";

export const useInitialValue = (initialValue) => {
  const value = useRef(new Animated.Value(initialValue)).current;
  return value;
};

export const animateTiming = (value, toValue) => {
  Animated.timing(value, {
    toValue: toValue,
    duration: 250,
    easing: Easing.ease,
    useNativeDriver: true,
  }).start();
};
