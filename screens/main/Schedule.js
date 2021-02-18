import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ScrollView, Text, StyleSheet } from "react-native";

import Loader from "../../components/Loader";
import { fetchSchedule } from "../../store/actions";

const Schedule = ({ schedule, fetchSchedule, token, loading, route }) => {
  useEffect(() => {
    if (!schedule) fetchSchedule(token);
  }, [schedule, token, fetchSchedule]);

  if (loading) return <Loader />;

  const day = route.params?.day;

  return (
    <ScrollView style={styles.screen}>
      <Text>{schedule ? `${day}tu je` : `${day}nema ga`}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
});

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
