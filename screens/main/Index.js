import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import { connect } from 'react-redux';
import OpenSocket from 'socket.io-client';

import { Body, TitleTwo, Subheadline } from '../../components/Typography';
import { formatTime } from '../../utils/format';
import Colors from '../../utils/colors';
import Button from '../../components/Button';
import { ScheduleTime } from '../../components/ScheduleBody';
import {
  fetchQuickSchedule,
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
  }),
  { fetchQuickSchedule }
)(
  ({
    quickSchedule,
    token,
    fetchQuickSchedule,
    loading,
    navigation,
    isAdmin,
  }) => {
    useEffect(() => {
      if (!quickSchedule) fetchQuickSchedule(token);
    }, []);

    return (
      <View style={[styles.quickSchedule, styles.withBorder]}>
        {loading ? (
          <Loader contentContainerStyle={{ marginVertical: 32 }} />
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
              quickTime
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
  user,
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

  const hasBooking = user.schedule?.find((b) => b.date === getBackendDate(0));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {hasBooking && (
        <Pressable
          style={styles.playing}
          onPress={() => {
            navigation.navigate('ScheduleDaysTabs', {
              screen: 'Danas',
            });
          }}
        >
          <Body style={styles.playingText}>
            Igrate danas u {formatTime(hasBooking.time)} na terenu br.{' '}
            {hasBooking.court}.
          </Body>
          <Button tertiary circle style={{ padding: 4 }}>
            Otkaži
          </Button>
        </Pressable>
      )}
      <ScrollView contentContainerStyle={styles.wrapper}>
        {/* <View style={styles.section}>
          <LargeTitle style={{ color: Colors.black, textAlign: 'center' }}>
            TK Lajkovac
          </LargeTitle>
          <LargeTitle style={{ color: Colors.black, textAlign: 'center' }}>
            Zvanična aplikacija
          </LargeTitle>
        </View> */}
        {!hasBooking && (
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
        )}
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
  playing: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 56,
    padding: 10,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.gray,
    shadowOpacity: 1,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    zIndex: 3,
  },
  playingText: {
    color: Colors.white,
    fontWeight: '600',
    letterSpacing: 0.36,
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

export default connect(
  (state) => ({
    token: state.auth.token,
    user: state.user.user,
  }),
  {
    createDay,
    deleteDay,
    updateDay,
    updateUser,
  }
)(Index);
