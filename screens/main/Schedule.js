import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";

import Loader from "../../components/Loader";
import { fetchSchedule } from "../../store/actions";
import ScheduleBody from "../../components/ScheduleBody";

const Schedule = ({
  schedule,
  fetchSchedule,
  token,
  loading,
  route,
  navigation,
}) => {
  useEffect(() => {
    if (!schedule) fetchSchedule(token);
  }, [schedule, token, fetchSchedule]);

  if (loading || !schedule) return <Loader />;

  const day = route.params?.day;
  const scheduleDay = schedule && schedule[day];

  return (
    <View style={styles.screen}>
      <ScheduleBody schedule={scheduleDay} day={day} navigation={navigation} />
    </View>
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
