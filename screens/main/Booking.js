import React, { Fragment, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';

import { formatTime } from '../../utils/format';
import getDate from '../../utils/getDate';
import Loader from '../../components/Loader';
import Field from '../../components/Field';
import Button from '../../components/Button';
import Info from '../../components/Info';
import { TitleOne } from '../../components/Typography';
import {
  scheduleTime,
  adminScheduleTime,
  fetchSchedule,
} from '../../store/actions';

const selectTime = (schedule, id) => {
  if (!schedule)
    return { start: '', end: '', userName: '', userId: '', taken: false };

  const times = [];

  schedule.forEach((s) =>
    s.courts.forEach((c) => c.times.forEach((t) => times.push(t)))
  );

  return times.find((t) => t._id === id);
};

const Booking = ({
  route,
  navigation,
  scheduleTime,
  token,
  loading,
  users,
  error,
  schedule,
  adminScheduleTime,
  fetchSchedule,
}) => {
  const { _id, day, court, isAdmin } = route.params;

  useEffect(() => {
    if (!schedule) fetchSchedule(token);
  }, []);

  // const [opponenet, setOpponent] = useState("");
  const {
    start,
    end,
    userName: pUserName = '',
    userId = '',
    taken,
  } = selectTime(schedule, _id);
  const [userName, setUserName] = useState(pUserName);

  const user = users?.find((u) => u.userId === userId);
  const name = user?.data.displayName || userName;

  const handleBooking = () => {
    scheduleTime({ token, court, start, day }).then((res) => {
      if (!res && error) {
        Alert.alert('Došlo je do greške', error, [
          {
            text: 'Nazad',
            onPress: () => navigation.goBack(),
            style: 'cancel',
          },
        ]);
      } else {
        Alert.alert('Termin zakazan', res, [
          {
            text: 'U redu',
            onPress: () => navigation.goBack(),
            style: 'cancel',
          },
        ]);
      }
    });
  };

  const handleAdminBooking = (action = '') => {
    adminScheduleTime({ token, court, start, day, userName, action }).then(
      (res) => {
        if (!res && error) {
          Alert.alert('Došlo je do greške', error, [
            {
              text: 'Nazad',
              style: 'cancel',
            },
          ]);
        } else {
          Alert.alert(
            action === 'cancel' ? 'Termin otkazan' : 'Termin zakazan',
            res,
            [
              {
                text: 'U redu',
                style: 'cancel',
              },
            ]
          );
        }
      }
    );
  };

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={40}
        style={styles.wrapper}
      >
        <ScrollView style={styles.description}>
          {taken && isAdmin ? (
            <TakenTime name={name} />
          ) : (
            <FreeTime
              isAdmin={isAdmin}
              userName={userName}
              setUserName={setUserName}
            />
          )}
          <Information day={day} court={court} start={start} end={end} />
          {/* otom potom */}
          {/* <Field
            label="Ime protivnika"
            onChange={(value) => setOpponent(value)}
            value={opponenet}
            autoFocus={false}
            type="name"
            style={{ marginBottom: 16 }}
          /> */}
        </ScrollView>
        <View style={styles.actions}>
          {isAdmin ? (
            taken ? (
              <Button
                primary
                default
                fluid
                onPress={() => handleAdminBooking('cancel')}
              >
                Otkaži
              </Button>
            ) : (
              <Button
                primary
                default
                fluid
                onPress={() => handleAdminBooking('')}
              >
                Zakaži
              </Button>
            )
          ) : (
            <Button primary default fluid onPress={handleBooking}>
              Zakaži
            </Button>
          )}
          <Button tertiary default fluid onPress={() => navigation.goBack()}>
            Nazad
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const Information = ({ day, court, start, end }) => (
  <Fragment>
    <Info
      label="Datum"
      value={getDate(day).string}
      style={{ marginBottom: 16 }}
    />
    <Info label="Teren" value={`Broj ${court}`} style={{ marginBottom: 16 }} />
    <Info
      label="Počinje"
      value={formatTime(start)}
      style={{ marginBottom: 16 }}
    />
    <Info
      label="Završava se"
      value={formatTime(end)}
      style={{ marginBottom: 16 }}
    />
  </Fragment>
);

const FreeTime = ({ isAdmin, userName, setUserName }) => {
  return (
    <Fragment>
      <TitleOne style={{ marginBottom: 32 }}>Zakažite termin</TitleOne>
      {isAdmin && (
        <Field
          label="Ime i prezime"
          value={userName}
          onChange={setUserName}
          spacing
        />
      )}
    </Fragment>
  );
};

const TakenTime = ({ name }) => (
  <Fragment>
    <TitleOne style={{ marginBottom: 32 }}> Otkažite termin</TitleOne>
    <Info label="Ime člana" value={name} style={{ marginBottom: 16 }} />
  </Fragment>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 32,
    justifyContent: 'space-between',
  },
  wrapper: {
    flexGrow: 1,
  },
  description: {
    flex: 1,
    paddingVertical: 16,
  },
});

export default connect(
  (state) => ({
    token: state.auth.token,
    loading: state.schedule.loading,
    error: state.schedule.error,
    users: state.user.users,
    schedule: state.schedule.schedule,
  }),
  {
    scheduleTime,
    adminScheduleTime,
    fetchSchedule,
  }
)(Booking);
