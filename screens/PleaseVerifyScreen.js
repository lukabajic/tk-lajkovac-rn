import React, { useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { LargeTitle, Callout } from "../components/Typography";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import Link from "../components/Link";
import colors from "../utils/colors";
import {
  userClearError,
  logout,
  fetchCurUser,
  resendVerify,
} from "../store/actions";

const NoInfoScreen = ({
  error,
  loading,
  user,
  token,
  userClearError,
  logout,
  fetchCurUser,
  resendVerify,
}) => {
  const [alreadyReSent, setAlreadyReSent] = useState(false);

  useEffect(() => () => userClearError(), []);

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView bounces={false} contentContainerStyle={styles.form}>
        <View style={styles.logout}>
          <Button elevated onPress={logout}>
            <Ionicons name="log-out-outline" size={24} color={colors.black} />
          </Button>
        </View>
        <View style={styles.header}>
          <LargeTitle>Potvrdite email</LargeTitle>
        </View>
        {error && <Alert message={error} type="danger" />}
        <View style={styles.textBox}>
          <Callout style={styles.text}>
            Poslali smo email na {user.email}.
          </Callout>
          <Callout style={styles.text}>
            Molim vas potvrdite da je to vaša email adresa klikom na link koji
            ste dobili.
          </Callout>
        </View>
        <View style={styles.actions}>
          <Button primary square onPress={() => fetchCurUser(token)}>
            <Ionicons name="arrow-forward" size={28} color={colors.white} />
          </Button>
        </View>
      </ScrollView>
      <View style={styles.otherActions}>
        <Link
          darkGray
          style={{ textAlign: "center" }}
          action={() => {
            setAlreadyReSent(true);
            resendVerify(token);
          }}
          disabled={alreadyReSent}
        >
          Pošaljite opet
        </Link>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  header: {
    marginBottom: 40,
  },
  textBox: {
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
  },
  logout: {
    position: "absolute",
    top: 6,
    right: 6,
  },
});

export default connect(
  (state) => ({
    loading: state.user.loading,
    error: state.user.error,
    user: state.user.user,
    token: state.auth.token,
  }),
  { userClearError, logout, fetchCurUser, resendVerify }
)(NoInfoScreen);
