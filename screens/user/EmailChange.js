import React, { useState } from "react";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import FormScreen from "../../components/FormScreen";
import FormFields from "../../components/FormFields";
import Loader from "../../components/Loader";
import { updateData } from "../../store/actions";
import { userEmailForm } from "../../utils/forms";

const ChangeNameScreen = ({ user, error, updateData, loading, token }) => {
  const [form, setForm] = useState(userEmailForm(user));

  const onSubmit = () => {
    const { email } = form.values;

    updateData(token, "UPDATE_EMAIL", { email });

    setForm(userEmailForm(user));
  };

  const isFormValid = () => form.fields.email.meta.valid;

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
