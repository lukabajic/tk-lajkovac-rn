import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import Loader from '../../components/Loader';
import { fetchSchedule, fetchUsers } from '../../store/actions';
import ScheduleBody from '../../components/ScheduleBody';

const Schedule = ({
  schedule,
  users,
  fetchSchedule,
  fetchUsers,
  token,
  loading,
  route,
  navigation,
}) => {
  useEffect(() => {
    if (!schedule) fetchSchedule(token);
    if (!users) fetchUsers(token, { loadMore: false });
  }, []);

  if (loading || !schedule) return <Loader />;

  const day = route.params?.day;
  const scheduleDay = schedule && schedule[day];

  return (
    <View style={styles.screen}>
      <ScheduleBody
        schedule={scheduleDay}
        day={day}
        navigation={navigation}
        users={users}
      />
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
    loading: state.schedule.loading || state.user.loading,
    token: state.auth.token,
    users: state.user.users,
  }),
  {
    fetchSchedule,
    fetchUsers,
  }
)(Schedule);
