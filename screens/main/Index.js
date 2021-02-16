import React from "react";
import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native";

import { LargeTitle, Headline, Callout } from "../../components/Typography";
import Colors from "../../utils/colors";

const Index = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <LargeTitle style={{ color: Colors.black }}>TK Lajkovac</LargeTitle>
        <Headline style={{ color: Colors.black }}>Zvanična aplikacija</Headline>
        <View style={styles.info}>
          <Callout style={[styles.callout, { marginBottom: 8 }]}>
            Zakazivanje termina besplatno, online.
          </Callout>
          <Callout style={[styles.callout, { marginBottom: 8 }]}>
            Kontaktirajte druge članove.
          </Callout>
          <Callout style={styles.callout}>Pratite rezultate lige.</Callout>
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
});

export default Index;
