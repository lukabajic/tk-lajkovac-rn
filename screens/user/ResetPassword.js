import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import Button from "../../components/Button";
import Loader from "../../components/Loader";
import FormFields from "../../components/FormFields";
import colors from "../../utils/colors";
import { resetPassword, userClearError, auth } from "../../store/actions";
import Info from "../../components/Info";
import FormScreen from "../../components/FormScreen";

const INITIAL_FORM = {
  anyTouched: false,
  values: {
    email: "",
  },
  fields: {
    email: {
      type: "emailAddress",
      label: "Email",
      placeholder: "primer@gmail.com",
      autoFocus: true,
      keyboardType: "email-address",
      meta: {
        valid: false,
        touched: false,
        error: null,
      },
    },
  },
};

const LOGIN_FORM = {
  anyTouched: false,
  values: {
    password: "",
  },
  fields: {
    password: {
      type: "password",
      label: "Lozinka",
      placeholder: "********",
      autoFocus: true,
      meta: {
        valid: false,
        touched: false,
        error: null,
      },
    },
  },
};

const ResetPassword = ({
  error,
  loading,
  resetPassword,
  userClearError,
  auth,
}) => {
  const [email, setEmail] = useState("");
  const [form, setForm] = useState(INITIAL_FORM);

  useEffect(() => () => userClearError(), []);

  useEffect(() => {
    if (email) {
      setForm(LOGIN_FORM);
    }
  }, [email]);

  const isFormValid = () =>
    !email ? form?.fields.email?.meta.valid : form?.fields.password?.meta.valid;

  const onResetPassword = async () => {
    const { email } = form.values;

    try {
      await resetPassword(email);

      setEmail(email);
    } catch (err) {
      console.warn(err);
    }
  };

  const login = () => {
    const { password } = form.values;

    auth("/login", email, password);
  };

  if (loading) return <Loader />;

  return (
    <FormScreen
      title={!email ? "Pošaljite novu lozinku na svoj email" : "Ulogujte se"}
      subtitle={email ? "Poslali smo novu šifru na vašu email adresu." : null}
      error={error}
    >
      {email ? (
        <Info
          label="Email"
          value={email}
          style={{ marginBottom: 16, width: "100%", maxWidth: 320 }}
        />
      ) : null}
      <FormFields form={form} setForm={setForm} />
      <View>
        <Button
          primary
          square
          onPress={!email ? onResetPassword : login}
          disabled={!isFormValid()}
        >
          <Ionicons
            name="arrow-forward"
            size={28}
            color={isFormValid() ? colors.white : colors.gray}
          />
        </Button>
      </View>
    </FormScreen>
  );
};

const BottomContent = () => (
  <View>
    <Text>Cao</Text>
  </View>
);

export default connect(
  (state) => ({
    loading: state.user.loading || state.auth.loading,
    error: state.user.error || state.auth.error,
    user: state.user.user,
    token: state.auth.token,
  }),
  { resetPassword, userClearError, auth }
)(ResetPassword);
