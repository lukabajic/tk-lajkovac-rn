import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";

import { LargeTitle, Headline, Callout } from "../../components/Typography";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import Colors from "../../utils/colors";

import image from "../../assets/banner.png";

const NoTokenIndex = ({ navigation, loading }) => {
  if (loading) return <Loader />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <Image style={styles.image} source={image} />
        <LargeTitle style={{ color: Colors.black }}>TK Lajkovac</LargeTitle>
        {/* <Headline style={{ color: Colors.black }}>Zvanična aplikacija</Headline> */}
        {/* <View style={styles.info}>
          <Callout style={[styles.callout, { marginBottom: 8 }]}>
            Zakazivanje termina besplatno, online.
          </Callout>
          <Callout style={[styles.callout, { marginBottom: 8 }]}>
            Kontaktirajte druge članove.
          </Callout>
          <Callout style={styles.callout}>Pratite rezultate lige.</Callout>
        </View> */}
        <View style={styles.actions}>
          <Button
            tertiary
            default
            fluid
            style={{ marginBottom: 8 }}
            onPress={() => navigation.navigate("SignUp")}
          >
            Registracija
          </Button>
          <Button
            primary
            default
            fluid
            onPress={() => navigation.navigate("SignIn")}
          >
            Prijavi se
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
  image: {
    width: "90%",
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

export default connect((state) => ({ loading: state.user.loading }))(
  NoTokenIndex
);
