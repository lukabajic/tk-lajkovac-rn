import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { formatTime } from "../../utils/format";
import getDate from "../../utils/getDate";
import Colors from "../../utils/colors";
import Button from "../../components/Button";
import Info from "../../components/Info";
import Field from "../../components/Field";
import { TitleOne, Footnote } from "../../components/Typography";

const Booking = ({ route, navigation }) => {
  const { start, end, day } = route.params;
  const [opponenet, setOpponent] = useState("");

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
          <Button primary default fluid>
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

export default Booking;
