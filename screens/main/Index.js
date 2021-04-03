import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import OpenSocket from "socket.io-client";

import { LargeTitle, TitleTwo, Subheadline } from "../../components/Typography";
import Colors from "../../utils/colors";
import Button from "../../components/Button";
import { ScheduleTime } from "../../components/ScheduleBody";
import {
  fetchSchedule,
  deleteDay,
  createDay,
  updateDay,
  updateUser,
} from "../../store/actions";
import Loader from "../../components/Loader";
import { getBackendDate } from "../../utils/getDate";

const selectQuickTimes = (schedule) => {
  if (!schedule) return [];

  const courts = schedule?.find((d) => d.date === getBackendDate(0))?.courts;

  const times = [];

  courts?.forEach((c) =>
    c.times.forEach((t) => {
      if (t.taken) return;

      const hours = new Date().getHours();
      const startHour = Number(t.start.slice(0, 2));

      if (hours === startHour) {
        const minutes = new Date().getMinutes();
        const startMinute = Number(t.start.slice(2, 4));

        if (minutes > startMinute) return;
      }

      if (hours > startHour) return;

      t.court = c.number;
      times.push(t);
    })
  );

  times.sort((a, b) => {
    const aHours = Number(a.start.slice(0, 2));
    const bHours = Number(b.start.slice(0, 2));
    const aMinutes = Number(a.start.slice(2, 4));
    const bMinutes = Number(b.start.slice(2, 4));

    if (aHours === bHours) return aMinutes - bMinutes;

    return aHours - bHours;
  });

  return times.slice(0, 3);
};

const QuickSchedule = connect(
  (state) => ({
    token: state.auth.token,
    schedule: state.schedule.schedule,
    loading: state.schedule.loading,
    isAdmin: state.user.user.isAdmin,
  }),
  { fetchSchedule }
)(({ schedule, token, fetchSchedule, loading, navigation, isAdmin }) => {
  useEffect(() => {
    if (!schedule) fetchSchedule(token);
  }, []);

  const times = selectQuickTimes(schedule);

  return (
    <View style={[styles.quickSchedule, styles.withBorder]}>
      {loading ? (
        <Loader contentContainerStyle={{ marginVertical: 32 }} />
      ) : times.length ? (
        times.map((t, i) => (
          <ScheduleTime
            key={i}
            item={t}
            day={0}
            court={t.court}
            navigation={navigation}
            notLast={i + 1 < times.length}
            isAdmin={isAdmin}
          />
        ))
      ) : (
        <Subheadline style={{ textAlign: "center" }}>
          Nema slobodnih termina do kraja dana
        </Subheadline>
      )}
    </View>
  );
});

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
      const socket = OpenSocket("http://localhost:8000");
      socket.on("schedule", (data) => {
        switch (data.action) {
          case "create":
            data.scheduleDay && createDay(data.scheduleDay);
            break;

          case "delete":
            data.scheduleDay && deleteDay(data.date);
            break;

          case "edit":
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
          <LargeTitle style={{ color: Colors.black, textAlign: "center" }}>
            TK Lajkovac
          </LargeTitle>
          <LargeTitle style={{ color: Colors.black, textAlign: "center" }}>
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
            onPress={() => navigation.navigate("ScheduleDaysTabs")}
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
            onPress={() => navigation.navigate("UsersStack")}
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
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    marginTop: 12,
  },
  callout: {
    color: Colors.darkGray,
    textAlign: "center",
  },
  actions: {
    width: "100%",
    marginTop: 18,
  },
  section: {
    width: "100%",
    marginBottom: 32,
  },
  withBorder: {
    borderColor: "rgba(38,35,34,0.1)",
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    marginVertical: 8,
  },
  callToAction: {
    textAlign: "center",
  },
  news: {},
  quickSchedule: {
    width: "100%",
  },
});

export default connect((state) => ({ token: state.auth.token }), {
  createDay,
  deleteDay,
  updateDay,
  updateUser,
})(Index);
