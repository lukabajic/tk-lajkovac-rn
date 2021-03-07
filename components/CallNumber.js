import React from "react";
import { Linking, Alert, Platform, Pressable, Text } from "react-native";

import Colors from "../utils/colors";

const CallNumber = ({ contentContainerStyle, style }) => {
  const callNumber = (phone) => {
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Ovo trenutno nije moguće");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Pressable
      onPress={() => callNumber("+381628719500")}
      style={contentContainerStyle}
    >
      <Text
        style={{
          textDecorationLine: "underline",
          fontWeight: "700",
          color: Colors.blue,
          ...style,
        }}
      >
        +381 62 871 9500
      </Text>
    </Pressable>
  );
};

export default CallNumber;
