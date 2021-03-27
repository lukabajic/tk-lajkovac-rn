import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import Button from "../../components/Button";
import Loader from "../../components/Loader";
import Link from "../../components/Link";
import colors from "../../utils/colors";
import {
  userClearError,
  fetchCurUser,
  resendEmailVerification,
} from "../../store/actions";
import LogoutButton from "../../components/LogoutButton";
import screenOptions from "../../utils/screenOptions";
import FormScreen from "../../components/FormScreen";

const Stack = createStackNavigator();

const PleaseVerifyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        headerRight: () => <LogoutButton />,
      }}
    >
      <Stack.Screen
        name="PleaseVerifyScreen"
        component={PleaseVerifyScreen}
        options={{ title: false }}
      />
    </Stack.Navigator>
  );
};

const PleaseVerifyScreen = connect(
  (state) => ({
    loading: state.user.loading,
    error: state.user.error,
    user: state.user.user,
    token: state.auth.token,
  }),
  { userClearError, fetchCurUser, resendEmailVerification }
)(
  ({
    error,
    loading,
    user,
    token,
    userClearError,
    resendEmailVerification,
    fetchCurUser,
  }) => {
    const [alreadyReSent, setAlreadyReSent] = useState(false);

    useEffect(() => () => userClearError(), []);

    if (loading) return <Loader />;

    return (
      <FormScreen
        title="Potvrdite email"
        error={error}
        subtitle={`\n Poslali smo email na ${user.email}. \n Molim vas potvrdite da je to vaša email adresa klikom na link koji ste dobili.`}
        bottomContent={
          <BottomContent
            resendEmailVerification={resendEmailVerification}
            setAlreadyReSent={setAlreadyReSent}
            token={token}
            alreadyReSent={alreadyReSent}
          />
        }
      >
        <View>
          <Button primary square onPress={() => fetchCurUser(token)}>
            <Ionicons name="arrow-forward" size={28} color={colors.white} />
          </Button>
        </View>
      </FormScreen>
    );
  }
);

const BottomContent = ({
  resendEmailVerification,
  setAlreadyReSent,
  token,
  alreadyReSent,
}) => (
  <View>
    <Link
      darkGray
      style={{ textAlign: "center" }}
      action={() => {
        setAlreadyReSent(true);
        resendEmailVerification(token);
      }}
      disabled={alreadyReSent}
    >
      Pošaljite opet
    </Link>
  </View>
);

export default PleaseVerifyStack;
