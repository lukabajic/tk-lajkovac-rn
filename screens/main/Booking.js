import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { connect } from "react-redux";

import { formatTime } from "../../utils/format";
import getDate from "../../utils/getDate";
import Colors from "../../utils/colors";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import Info from "../../components/Info";
import Field from "../../components/Field";
import { TitleOne, Footnote } from "../../components/Typography";
import { scheduleTime } from "../../store/actions";

const Booking = ({
  route,
  navigation,
  scheduleTime,
  token,
  loading,
  error,
}) => {
  const { start, end, day, court } = route.params;
  const [opponenet, setOpponent] = useState("");

  if (loading) return <Loader />;

  const handleBooking = () => {
    scheduleTime(token, court, start, day).then((res) => {
      if (!res && error) {
        Alert.alert("Došlo je do greške", error, [
          {
            text: "Nazad",
            onPress: () => navigation.goBack(),
            style: "cancel",
          },
        ]);
      } else {
        Alert.alert("Zakazano", res, [
          {
            text: "Nazad",
            onPress: () => navigation.goBack(),
            style: "cancel",
          },
        ]);
      }
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={40}
        style={styles.wrapper}
      >
        <ScrollView style={styles.description}>
          <TitleOne style={{ marginBottom: 32 }}>Zakažite termin</TitleOne>
          <Info
            label="Datum"
            value={getDate(day).string}
            style={{ marginBottom: 16 }}
          />
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
          <Field
            label="Ime protivnika"
            onChange={(value) => setOpponent(value)}
            value={opponenet}
            autoFocus={false}
            type="name"
            style={{ marginBottom: 16 }}
          />
          <Footnote style={{ textAlign: "center", marginHorizontal: 16 }}>
            <Text style={{ color: Colors.red }}>Napomena:</Text> Ukoliko
            otkažete termin imate pravo na zakazivanje termina još samo jednom
            za isti dan. Budite pažljivi kada zakazujete.
          </Footnote>
        </ScrollView>
        <View style={styles.actions}>
          <Button primary default fluid onPress={handleBooking}>
            Zakaži
          </Button>
          <Button tertiary default fluid onPress={() => navigation.goBack()}>
            Nazad
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 32,
    justifyContent: "space-between",
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
  }),
  {
    scheduleTime,
  }
)(Booking);
