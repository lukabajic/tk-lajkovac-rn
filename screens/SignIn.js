import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";

const SignIn = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Text>SignIn</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default SignIn;
