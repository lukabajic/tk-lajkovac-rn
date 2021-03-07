import React from "react";
import { Linking, Alert, Pressable, Text } from "react-native";

import Colors from "../utils/colors";

export const callNumber = (phone) => {
  const url = `tel:${phone}`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        Alert.alert("Ovo trenutno nije moguće");
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.log(err));
};

export const textNumber = (phone) => {
  const url = `sms:${phone}`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        Alert.alert("Ovo trenutno nije moguće");
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.log(err));
};

const CallNumber = ({ contentContainerStyle, style }) => {
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
