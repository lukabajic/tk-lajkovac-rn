import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { TitleTwo, Headline, Subheadline } from '../components/Typography';
import Colors from '../utils/colors';
import { formatTime } from '../utils/format';
import { getBackendDate } from '../utils/getDate';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Info from '../components/Info';
import getDate from '../utils/getDate';
import { scheduleTime } from '../store/actions';

const isElapsed = (start, day) => {
  const hours = Number(start.slice(0, 2));
  const minutes = Number(start.slice(2, 4));

  const startTime = new Date(getBackendDate(day));
  startTime.setHours(hours);
  startTime.setMinutes(minutes);

  const curTime = new Date(Date.now() + day * 86400000);
  const limit = new Date(startTime.getTime() + 30 * 60000);

  return curTime.getTime() > limit.getTime();
};

export const ScheduleTime = ({
  item,
  navigation,
  day,
  court,
  notLast,
  isAdmin,
  users,
  quickTime = false,
}) => {
  const { taken, start, end, userId, userName, _id } = item;

  const scheduleTimeStyles = [styles.scheduleTime];
  taken && scheduleTimeStyles.push(styles.scheduleTimeTaken);
  notLast && scheduleTimeStyles.push(styles.marginBottom);
  const scheduleTimeBeforeStyles = [styles.scheduleTimeBefore];
  taken && scheduleTimeBeforeStyles.push(styles.scheduleTimeBeforeTaken);
  isElapsed(start, day) && scheduleTimeStyles.push(styles.unavailable);
  isElapsed(start, day) &&
    scheduleTimeBeforeStyles.push(styles.scheduleTimeBeforeElapsed);

  const user = users?.find((u) => u.userId === userId);
  const name = userName || user?.data?.displayName || '';

  return (
    <Pressable
      style={scheduleTimeStyles}
      disabled={(taken && !isAdmin) || isElapsed(start, day)}
      onPress={async () => {
        if (quickTime) {
          navigation.navigate('ScheduleDaysTabs', {
            screen: 'Danas',
            params: {
              screen: 'Booking',
              params: { _id, day, court, isAdmin },
            },
          });
        } else {
          navigation.navigate('Booking', { _id, day, court, isAdmin });
        }
      }}
    >
      <View style={scheduleTimeBeforeStyles} />
      <Headline style={{ color: Colors.darkGray }}>
        {taken ? (isAdmin ? name : 'Zauzet termin') : 'Slobodan termin'}
      </Headline>
      <View style={styles.scheduleWhen}>
        <Subheadline style={[styles.timeFont, styles.startTime]}>
          {formatTime(start)}
        </Subheadline>
        <Subheadline style={[styles.timeFont, styles.endTime]}>
          {formatTime(end)}
        </Subheadline>
      </View>
    </Pressable>
  );
};

const ScheduleCourt = ({
  item,
  onNext,
  onPrev,
  isSliding,
  navigation,
  day,
  user,
  users,
}) => {
  const { number, times } = item;

  return (
    <View style={styles.court}>
      <View style={styles.courtHeader}>
        {!isSliding && (
          <TouchableOpacity onPress={onPrev} disabled={number < 2}>
            <Ionicons
              size={24}
              name="chevron-back"
              color={number > 1 ? Colors.Black : Colors.gray}
            />
          </TouchableOpacity>
        )}
        <TitleTwo style={{ color: Colors.black, textAlign: 'center', flex: 1 }}>
          {' '}
          Teren br. {number}
        </TitleTwo>
        {!isSliding && (
          <TouchableOpacity onPress={onNext} disabled={number > 2}>
            <Ionicons
              size={24}
              name="chevron-forward"
              color={number < 3 ? Colors.Black : Colors.gray}
            />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        style={styles.scheduleTimes}
        data={times}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <ScheduleTime
            navigation={navigation}
            item={item}
            day={day}
            court={number}
            isAdmin={user?.isAdmin}
            users={users}
          />
        )}
      />
    </View>
  );
};

const AlreadyBooked = ({ day, court, time, scheduleTime, token, error }) => (
  <View style={styles.alreadyBooked}>
    <View style={styles.alreadyBookedContent}>
      {error && <Alert message={error} type="danger" />}
      <TitleTwo style={{ marginBottom: 32, marginTop: 16 }}>
        Već imate zakazan termin za ovaj dan.
      </TitleTwo>
      <Info
        label="Datum"
        value={getDate(day).string}
        style={{ marginBottom: 16 }}
      />
      <Info
        label="Teren"
        value={`Broj ${court}`}
        style={{ marginBottom: 16 }}
      />
      <Info
        label="Vreme"
        value={formatTime(time)}
        style={{ marginBottom: 16 }}
      />
    </View>

    <View style={styles.alreadyBookedActions}>
      <Button
        tertiary
        default
        fluid
        onPress={() =>
          scheduleTime({ token, court, start: time, day, action: 'cancel' })
        }
      >
        Otkaži
      </Button>
      {/* <Footnote style={{ textAlign: "center", marginHorizontal: 16 }}>
        <Text style={{ color: Colors.red }}>Napomena:</Text> Ukoliko otkažete
        termin imate pravo na zakazivanje termina još samo jednom za isti dan.
        Budite pažljivi kada zakazujete.
      </Footnote> */}
    </View>
  </View>
);

class ScheduleBody extends Component {
  state = {
    isSliding: false,
  };

  render() {
    const {
      schedule,
      navigation,
      day,
      user,
      users,
      scheduleTime,
      token,
      error,
    } = this.props;
    const { isSliding } = this.state;
    const windowWidth = Dimensions.get('window').width;

    const hasBooking = user.schedule?.find(
      (b) => b.date === getBackendDate(day)
    );

    if (hasBooking && !user?.isAdmin)
      return (
        <AlreadyBooked
          day={day}
          time={hasBooking.time}
          court={hasBooking.court}
          scheduleTime={scheduleTime}
          token={token}
          error={error}
        />
      );

    return (
      <Carousel
        ref={(c) => {
          this._carousel = c;
        }}
        data={schedule?.courts?.sort((a, b) => a.number > b.number)}
        itemWidth={windowWidth - 32}
        sliderWidth={windowWidth - 32}
        onBeforeSnapToItem={() => this.setState({ isSliding: true })}
        onSnapToItem={() => this.setState({ isSliding: false })}
        renderItem={({ item }) => (
          <ScheduleCourt
            navigation={navigation}
            day={day}
            isSliding={isSliding}
            item={item}
            onNext={() => this._carousel.snapToNext()}
            onPrev={() => this._carousel.snapToPrev()}
            user={user}
            users={users}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  court: {
    flex: 1,
    paddingVertical: 16,
  },
  courtHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  scheduleTime: {
    position: 'relative',
    height: 64,
    width: '100%',
    paddingLeft: 28,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.white,
    borderColor: 'rgba(38,35,34, 0.2)',
    borderWidth: 1,
  },
  unavailable: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  scheduleTimeBefore: {
    position: 'absolute',
    height: 64,
    width: 12,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: Colors.primary,
  },
  scheduleTimeBeforeTaken: {
    backgroundColor: Colors.yellow,
  },
  scheduleTimeBeforeElapsed: {
    backgroundColor: Colors.gray,
  },
  timeFont: { fontVariant: ['tabular-nums'] },
  startTime: { color: Colors.darkGray },
  endTime: { color: Colors.gray },
  alreadyBooked: { flex: 1 },
  alreadyBookedContent: { flex: 1 },
  marginBottom: { marginBottom: 12 },
});

export default connect(
  (state) => ({
    user: state.user.user,
    token: state.auth.token,
    error: state.schedule.error,
  }),
  {
    scheduleTime,
  }
)(ScheduleBody);
