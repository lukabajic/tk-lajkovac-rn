import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { LargeTitle, Callout } from "../../components/Typography";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { validate } from "../../utils/validate";
import FormFields from "../../components/FormFields";
import Alert from "../../components/Alert";
import colors from "../../utils/colors";
import { resetPassword, userClearError, auth } from "../../store/actions";
import Info from "../../components/Info";

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
      autoFocus: false,
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

  const onChangeHandler = (field, value) => {
    setForm({
      ...form,
      values: {
        ...form.values,
        [field]: value,
      },
      fields: {
        ...form.fields,
        [field]: {
          ...form.fields[field],
          meta: {
            ...form.fields[field].meta,
            valid: validate(field, value, form).valid,
            error: validate(field, value, form).error,
          },
        },
      },
    });
  };

  const onBlurHandler = (field, value) => {
    setForm({
      ...form,
      anyTouched: true,
      fields: {
        ...form.fields,
        [field]: {
          ...form.fields[field],
          meta: {
            ...form.fields[field].meta,
            touched: true,
            valid: validate(field, value, form).valid,
            error: validate(field, value, form).error,
          },
        },
      },
    });
  };

  const isFormValid = () =>
    !email ? form?.fields.email?.meta.valid : form?.fields.password?.meta.valid;

  const onResetPassword = async () => {
    const { email } = form.values;

    try {
      await resetPassword(email);

      setForm(LOGIN_FORM);
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
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        // android add
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={40}
        style={styles.wrapper}
      >
        <ScrollView bounces={false} contentContainerStyle={styles.form}>
          <View style={styles.header}>
            <LargeTitle style={{ marginBottom: 10, textAlign: "center" }}>
              {!email ? "Pošaljite novu lozinku na svoj email" : "Ulogujte se"}
            </LargeTitle>
            {!!email && (
              <Callout style={{ textAlign: "center" }}>
                Poslali smo novu šifru na vašu email adresu.
              </Callout>
            )}
          </View>
          {error && <Alert message={error} type="danger" />}
          {!!email && (
            <Info
              label="Email"
              value={email}
              style={{ marginBottom: 16, width: "100%", maxWidth: 320 }}
            />
          )}
          <FormFields
            form={form}
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
            style={styles.inputs}
          />
          <View style={styles.actions}>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
  },
  wrapper: {
    flexGrow: 1,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  inputs: {
    marginBottom: 20,
  },
  logout: {
    position: "absolute",
    top: 16,
    right: 16,
    overflow: "visible",
  },
  actions: {},
});

export default connect(
  (state) => ({
    loading: state.user.loading || state.auth.loading,
    error: state.user.error,
    user: state.user.user,
    token: state.auth.token,
  }),
  { resetPassword, userClearError, auth }
)(ResetPassword);
