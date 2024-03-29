import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { fetchUsers } from '../../store/actions';
import Loader from '../../components/Loader';
import { LargeTitle, Headline, Callout } from '../../components/Typography';
import Colors from '../../utils/colors';
import { getBackendDate } from '../../utils/getDate';
import { callNumber, textNumber } from '../../components/CallNumber';

const BookingIcon = ({ isBooked }) => (
  <Ionicons
    name={isBooked ? 'checkmark-circle' : 'checkmark-circle-outline'}
    size={24}
    color={isBooked ? Colors.yellow : Colors.primary}
    style={{ marginRight: 2 }}
  />
);

const HeaderBooking = ({ schedule, isPremium }) => {
  const hasBookingToday = schedule?.find((d) => d.date === getBackendDate(0));
  const hasBookingTomorrow = schedule?.find(
    (d) => d.date === getBackendDate(1)
  );
  const hasBookingDayAfter = schedule?.find(
    (d) => d.date === getBackendDate(2)
  );

  return (
    <View style={styles.userSchedule}>
      <BookingIcon isBooked={hasBookingToday} />
      <BookingIcon isBooked={hasBookingTomorrow} />
      {isPremium && <BookingIcon isBooked={hasBookingDayAfter} />}
    </View>
  );
};

const UserBody = ({ phone, category }) => {
  return (
    <View style={styles.userBody}>
      <View style={styles.userBodyItem}>
        <Text
          style={{
            fontSize: category.length ? 24 : 12,
            color: category.length ? Colors.primary : Colors.darkGray,
            lineHeight: 24,
            textAlignVertical: 'center',
          }}
        >
          N/A
        </Text>
        <Callout style={{ color: Colors.gray, marginTop: 4 }}>
          Kategorija
        </Callout>
      </View>
      <TouchableOpacity
        style={styles.userBodyItem}
        onPress={() => phone && callNumber(phone)}
      >
        <Ionicons name="ios-call" size={24} color={Colors.darkGray} />
        <Callout style={{ color: Colors.gray, marginTop: 4 }}>Pozovi</Callout>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.userBodyItem}
        onPress={() => phone && textNumber(phone)}
      >
        <Ionicons name="ios-send" size={24} color={Colors.darkGray} />
        <Callout style={{ color: Colors.gray, marginTop: 4 }}>Poruka</Callout>
      </TouchableOpacity>
    </View>
  );
};

const User = ({ item }) => {
  const {
    data: { displayName, isPremium, phone },
    schedule,
    league: { leagueName, groupName },
  } = item;

  const category = leagueName + groupName;

  return (
    <View style={styles.user}>
      <View style={styles.userHeader}>
        <Ionicons
          name="ios-person-outline"
          size={24}
          color={Colors.darkGray}
          style={{ marginRight: 16 }}
        />
        <Headline style={{ color: Colors.darkGray, flex: 1, marginRight: 16 }}>
          {displayName}
        </Headline>
        <HeaderBooking schedule={schedule} isPremium={isPremium} />
      </View>
      <UserBody phone={phone} category={category} />
    </View>
  );
};

const Users = ({ fetchUsers, users, user, token, loading, loadingMore }) => {
  useEffect(() => {
    if (!users) fetchUsers(token, { loadMore: false });
  }, [users, token, fetchUsers]);

  const loadMore = () => {
    if (!loadingMore) {
      fetchUsers(token, { loadMore: true });
    }
  };

  if (loading || !users) return <Loader />;

  return (
    <View style={styles.screen}>
      <LargeTitle style={{ textAlign: 'center', marginBottom: 32 }}>
        Spisak članova
      </LargeTitle>
      <FlatList
        data={users.filter((u) => u.userId !== user.userId)}
        style={styles.users}
        keyExtractor={(item) => item.userId}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        onEndReached={loadMore}
        renderItem={({ item }) => <User item={item} />}
      />
      {loadingMore && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  users: {
    overflow: 'visible',
  },
  user: {
    padding: 16,
    backgroundColor: Colors.white,
    shadowColor: Colors.gray,
    shadowOpacity: 1,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
    borderRadius: 4,
    elevation: 3,
    margin: 3,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomColor: 'rgba(38, 35, 34, 0.2)',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  userSchedule: {
    flexDirection: 'row',
  },
  userBody: {
    flexDirection: 'row',
  },
  userBodyItem: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(
  (state) => ({
    token: state.auth.token,
    users: state.user.users,
    user: state.user.user,
    loading: state.user.loading,
    loadingMore: state.user.loadingMore,
  }),
  { fetchUsers }
)(Users);
