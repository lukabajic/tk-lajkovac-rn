import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import OpenSocket from 'socket.io-client';

import { LargeTitle, TitleTwo, Subheadline } from '../../components/Typography';
import Colors from '../../utils/colors';
import Button from '../../components/Button';
import { ScheduleTime } from '../../components/ScheduleBody';
import {
  fetchQuickSchedle,
  deleteDay,
  createDay,
  updateDay,
  updateUser,
} from '../../store/actions';
import Loader from '../../components/Loader';
import { getBackendDate } from '../../utils/getDate';

const QuickSchedule = connect(
  (state) => ({
    token: state.auth.token,
    quickSchedule: state.schedule.quickSchedule,
    loading: state.schedule.loading,
    isAdmin: state.user.user.isAdmin,
    user: state.user.user,
  }),
  { fetchQuickSchedle }
)(
  ({
    quickSchedule,
    token,
    fetchQuickSchedle,
    loading,
    navigation,
    isAdmin,
    user,
  }) => {
    useEffect(() => {
      if (!quickSchedule) fetchQuickSchedle(token);
    }, []);

    const hasBooking = user.quickSchedule?.find(
      (b) => b.date === getBackendDate(0)
    );

    return (
      <View style={[styles.quickSchedule, styles.withBorder]}>
        {loading ? (
          <Loader contentContainerStyle={{ marginVertical: 32 }} />
        ) : hasBooking ? (
          <Subheadline style={{ textAlign: 'center' }}>
            Već imate zakazan termin za ovaj dan.
          </Subheadline>
        ) : quickSchedule?.length ? (
          quickSchedule.map((t, i) => (
            <ScheduleTime
              key={i}
              item={t}
              day={0}
              court={t.court}
              navigation={navigation}
              notLast={i + 1 < quickSchedule?.length}
              isAdmin={isAdmin}
            />
          ))
        ) : (
          <Subheadline style={{ textAlign: 'center' }}>
            Nema slobodnih termina do kraja dana
          </Subheadline>
        )}
      </View>
    );
  }
);

const Index = ({
  navigation,
  token,
  createDay,
  deleteDay,
  updateDay,
  updateUser,
}) => {
  useEffect(() => {
    if (token) {
      const socket = OpenSocket('http://localhost:8000');
      socket.on('schedule', (data) => {
        switch (data.action) {
          case 'create':
            data.scheduleDay && createDay(data.scheduleDay);
            break;

          case 'delete':
            data.scheduleDay && deleteDay(data.date);
            break;

          case 'edit':
            data.user && updateUser(data.user);
            data.scheduleDay && updateDay(data.scheduleDay);
            break;

          default:
            break;
        }
      });
    }
  }, [token]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.section}>
          <LargeTitle style={{ color: Colors.black, textAlign: 'center' }}>
            TK Lajkovac
          </LargeTitle>
          <LargeTitle style={{ color: Colors.black, textAlign: 'center' }}>
            Zvanična aplikacija
          </LargeTitle>
        </View>
        <View style={styles.section}>
          <TitleTwo style={styles.callToAction}>Brzo zakazivanje</TitleTwo>
          <QuickSchedule navigation={navigation} />
          <Button
            primary
            fluid
            default
            onPress={() => navigation.navigate('ScheduleDaysTabs')}
          >
            Pregledaj sve
          </Button>
        </View>
        <View style={styles.section}>
          <TitleTwo style={styles.callToAction}> Tražite protivnika?</TitleTwo>
          <Button
            primary
            fluid
            default
            onPress={() => navigation.navigate('UsersStack')}
          >
            Pregledaj članove
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    marginTop: 12,
  },
  callout: {
    color: Colors.darkGray,
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    marginTop: 18,
  },
  section: {
    width: '100%',
    marginBottom: 32,
  },
  withBorder: {
    borderColor: 'rgba(38,35,34,0.1)',
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    marginVertical: 8,
  },
  callToAction: {
    textAlign: 'center',
  },
  news: {},
  quickSchedule: {
    width: '100%',
  },
});

export default connect((state) => ({ token: state.auth.token }), {
  createDay,
  deleteDay,
  updateDay,
  updateUser,
})(Index);
