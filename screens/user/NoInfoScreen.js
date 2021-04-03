import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import Button from "../../components/Button";
import Loader from "../../components/Loader";
import FormFields from "../../components/FormFields";
import { userDataForm } from "../../utils/forms";
import colors from "../../utils/colors";
import { updateData, userClearError } from "../../store/actions";
import LogoutButton from "../../components/LogoutButton";
import screenOptions from "../../utils/screenOptions";
import FormScreen from "../../components/FormScreen";

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
    token: state.auth.token,
  }),
  { updateData, userClearError }
)(({ error, loading, updateData, token, userClearError }) => {
  const [form, setForm] = useState(userDataForm);

  useEffect(() => () => userClearError(), []);

  const isFormValid = () =>
    form.fields.displayName.meta.valid && form.fields.phone.meta.valid;

  const onSubmit = () => {
    const { displayName, phone } = form.values;

    updateData(token, "SET_INITIAL_DATA", { displayName, phone });

    setForm(userDataForm);
  };

  if (loading) return <Loader />;

  return (
    <FormScreen title="Vaše informacije" error={error}>
      <FormFields form={form} setForm={setForm} />
      <View>
        <Button primary square onPress={onSubmit} disabled={!isFormValid()}>
          <Ionicons
            name="arrow-forward"
            size={28}
            color={isFormValid() ? colors.white : colors.gray}
          />
        </Button>
      </View>
    </FormScreen>
  );
});

export default NoInfoStack;
