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
import { createStackNavigator } from "@react-navigation/stack";

import { LargeTitle } from "../../components/Typography";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { validate } from "../../utils/validate";
import FormFields from "../../components/FormFields";
import Alert from "../../components/Alert";
import { userDataForm } from "../../utils/forms";
import colors from "../../utils/colors";
import { updateData, userClearError } from "../../store/actions";
import LogoutButton from "../../components/LogoutButton";
import screenOptions from "../../utils/screenOptions";

const Stack = createStackNavigator();

const NoInfoStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        headerRight: () => <LogoutButton />,
      }}
    >
      <Stack.Screen
        name="NoInfoScreen"
        component={NoInfoScreen}
        options={{ title: false }}
      />
    </Stack.Navigator>
  );
};

const NoInfoScreen = connect(
  (state) => ({
    loading: state.user.loading,
    error: state.user.error,
    user: state.user.user,
    token: state.auth.token,
  }),
  { updateData, userClearError }
)(({ error, loading, user, updateData, token, userClearError }) => {
  const [form, setForm] = useState(userDataForm(user));

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
    form.fields.displayName.meta.valid && form.fields.phone.meta.valid;

  const onSubmit = () => {
    const { displayName, phone } = form.values;

    updateData(token, user, "SET_INITIAL_DATA", displayName, phone);

    setForm(userDataForm(user));
  };

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={40}
        style={styles.wrapper}
      >
        <ScrollView bounces={false} contentContainerStyle={styles.form}>
          <View style={styles.header}>
            <LargeTitle>Vaše informacije</LargeTitle>
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
});

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
    marginBottom: 40,
  },
  inputs: {
    marginBottom: 20,
  },
  actions: {},
});

export default NoInfoStack;
