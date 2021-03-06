import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import FormFields from "../../components/FormFields";
import Button from "../../components/Button";
import Link from "../../components/Link";
import { LargeTitle } from "../../components/Typography";
import { auth, authClearError } from "../../store/actions";
import colors from "../../utils/colors";
import { validate } from "../../utils/validate";
import { signInForm } from "../../utils/forms";
import Alert from "../../components/Alert";
import Loader from "../../components/Loader";

const SignIn = ({ auth, error, loading, authClearError, navigation }) => {
  const [form, setForm] = useState(signInForm);

  useEffect(() => () => authClearError(), []);

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
            valid: validate(field, value).valid,
            error: validate(field, value).error,
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
            valid: validate(field, value).valid,
            error: validate(field, value).error,
          },
        },
      },
    });
  };

  const isFormValid = () =>
    form.fields.email.meta.valid && form.fields.password.meta.valid;

  const onSubmit = () => {
    const { email, password } = form.values;

    auth("/login", email, password);

    setForm(signInForm);
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
            <LargeTitle>Prijavljivanje</LargeTitle>
          </View>
          {error && <Alert message={error} type="danger" />}
          <FormFields
            form={form}
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
            style={styles.inputs}
          />
          <View style={styles.actions}>
            <Button primary square onPress={onSubmit} disabled={!isFormValid()}>
              <Ionicons
                name="arrow-forward"
                size={28}
                color={isFormValid() ? colors.white : colors.gray}
              />
            </Button>
          </View>
        </ScrollView>
        <View style={styles.otherActions}>
          <Link
            darkGray
            style={{ textAlign: "center", marginBottom: 18 }}
            action={() => navigation.navigate("ResetPassword")}
          >
            Ne možete da se ulogujete?
          </Link>
          <Link
            darkGray
            style={{ textAlign: "center" }}
            action={() => navigation.replace("SignUp")}
          >
            Nemate nalog?
          </Link>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
    marginBottom: 40,
  },
  inputs: {
    marginBottom: 20,
  },
});

export default connect(
  (state) => ({ error: state.auth.error, loading: state.auth.loading }),
  { auth, authClearError }
)(SignIn);
