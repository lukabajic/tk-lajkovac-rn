import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

import Loader from "../../components/Loader";
import { fetchSchedule } from "../../store/actions";

const Schedule = ({ schedule, fetchSchedule, token, loading }) => {
  useEffect(() => {
    if (!schedule) fetchSchedule(token);
  }, [schedule, token, fetchSchedule]);

  if (loading) return <Loader />;

  return (
    <View>
      <Text>{schedule ? "tu je" : "nema ga"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default connect(
  (state) => ({
    schedule: state.schedule.schedule,
    loading: state.schedule.loading,
    token: state.auth.token,
  }),
  {
    fetchSchedule,
  }
)(Schedule);
