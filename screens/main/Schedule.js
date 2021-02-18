import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

const Schedule = ({ schedule }) => {
  return (
    <View>
      <Text>{schedule ? "tu je" : "nema ga"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default connect((state) => ({ schedule: state.schedule.schedule }))(
  Schedule
);
