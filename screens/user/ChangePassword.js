import React, { useState } from "react";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import FormScreen from "../../components/FormScreen";
import FormFields from "../../components/FormFields";
import Loader from "../../components/Loader";
import { updateData } from "../../store/actions";
import { userPasswordForm } from "../../utils/forms";
import Button from "../../components/Button";
import colors from "../../utils/colors";

const ChangeNameScreen = ({ user, error, updateData, loading, token }) => {
  const [form, setForm] = useState(userPasswordForm);

  const onSubmit = () => {
    const { email } = form.values;

    updateData(token, "UPDATE_PASSWORD", { oldPassword, password });

    setForm(userPasswordForm);
  };

  const isFormValid = () =>
    form.fields.oldPassword.meta.valid &&
    form.fields.password.meta.valid &&
    form.fields.confPassword.meta.valid;

  if (loading) return <Loader />;

  return (
    <FormScreen title="Promenite ime" error={error}>
      <FormFields form={form} setForm={setForm} prefill={["email"]} />
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
};

export default connect(
  (state) => ({
    user: state.user.user,
    error: state.user.error,
    loading: state.user.loading,
    token: state.auth.token,
  }),
  { updateData }
)(ChangeNameScreen);
