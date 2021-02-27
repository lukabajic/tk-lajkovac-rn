import React, { useState } from "react";
import { TextInput, View, StyleSheet, Animated, Text } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

import { animateTiming, useInitialValue } from "../utils/animate";
import Colors from "../utils/colors";

const Input = ({
  label,
  type = "none",
  meta,
  value,
  onChange,
  onBlur,
  autoFocus,
  spacing,
  keyboardType = "default",
  style = {},
}) => {
  const [focused, setFocused] = useState(false);
  // const [displayPassword, setDisplayPassowrd] = useState(false);

  const placeholderAnimate = useInitialValue(1);
  const placeholderLeftPos = useInitialValue(0);
  const placeholderTopPos = useInitialValue(0);

  const titleAnimate = useInitialValue(0);
  const titleLeftPos = useInitialValue(11);
  const titleTopPos = useInitialValue(15);

  const handleFocus = () => {
    setFocused(true);
    animateTiming(placeholderAnimate, 0);
    animateTiming(placeholderLeftPos, -11);
    animateTiming(placeholderTopPos, -15);
    animateTiming(titleAnimate, 1);
    animateTiming(titleLeftPos, 0);
    animateTiming(titleTopPos, 0);
  };

  const handleBlur = () => {
    setFocused(false);
    onBlur && onBlur();
    if (value?.length > 0) {
      return;
    }
    animateTiming(placeholderAnimate, 1);
    animateTiming(placeholderLeftPos, 0);
    animateTiming(placeholderTopPos, 0);
    animateTiming(titleAnimate, 0);
    animateTiming(titleLeftPos, -11);
    animateTiming(titleTopPos, -15);
  };

  const parentStyles = [styles.parent];
  spacing && parentStyles.push(styles.marginBottom);

  const inputStyles = [styles.wrapper];
  style && inputStyles.push(style);
  focused && inputStyles.push(styles.focused);
  // meta.error && inputStyles.push(styles.errorWrapper);

  const isSecure = ["password", "newPassword"].includes(type);

  return (
    <View style={parentStyles}>
      <View style={inputStyles}>
        <Animated.Text
          style={[
            styles.text,
            styles.title,
            {
              opacity: titleAnimate,
              transform: [
                { scale: titleAnimate },
                { translateX: titleLeftPos },
                { translateY: titleTopPos },
              ],
            },
          ]}
        >
          {label}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.text,
            styles.placeholder,
            {
              opacity: placeholderAnimate,
              transform: [
                { scale: placeholderAnimate },
                { translateX: placeholderLeftPos },
                { translateY: placeholderTopPos },
              ],
            },
          ]}
        >
          {label}
        </Animated.Text>
        <TextInput
          value={value}
          onChangeText={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          autoFocus={autoFocus}
          style={styles.input}
          textContentType={type}
          secureTextEntry={isSecure /* && !displayPassword*/}
          selectionColor={Colors.darkGray}
          autoCapitalize={"none"}
          autoCorrect={false}
          keyboardType={keyboardType}
        />
        {/* {isSecure && focused && (
        <TouchableWithoutFeedback
          style={styles.passwordDisplay}
          onPressIn={() => console.log("z")}
          onPress={(e) => {
            console.log("z");
            setDisplayPassowrd(!displayPassword);
          }}
        >
          <Ionicons
            name={displayPassword ? "ios-eye-outline" : "ios-eye-off-outline"}
            size={24}
            color={Colors.darkGray}
          />
        </TouchableWithoutFeedback> 
      )}*/}
      </View>
      {meta?.touched && meta?.error && (
        <View style={styles.error}>
          <Text style={styles.errorText}>{meta?.error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: { width: "100%", maxWidth: 320 },
  wrapper: {
    position: "relative",
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
    borderColor: "transparent",
    borderWidth: 2,
  },
  marginBottom: {
    marginBottom: 16,
  },
  focused: {
    borderColor: Colors.darkGray,
    backgroundColor: "transparent",
  },
  errorWrapper: {
    borderColor: Colors.red,
    backgroundColor: "transparent",
  },
  text: {
    position: "absolute",
    fontSize: 10,
    letterSpacing: 1.28,
    fontWeight: "800",
    lineHeight: 10,
    textTransform: "uppercase",
    color: Colors.black,
  },
  placeholder: {
    top: 20,
    left: 16,
  },
  title: {
    top: 5,
    left: 5,
    color: Colors.darkGray,
  },
  input: {
    paddingTop: 20,
    paddingBottom: 6,
    paddingHorizontal: 5,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: "center",
    letterSpacing: 1.28,
    fontWeight: "700",
  },
  error: {
    marginLeft: 5,
    marginTop: 3,
  },
  errorText: {
    color: Colors.red,
    fontSize: 13,
  },
  // passwordDisplay: {
  //   position: "absolute",
  //   right: 10,
  //   top: 13,
  //   zIndex: 1000,
  // },
});

export default Input;
