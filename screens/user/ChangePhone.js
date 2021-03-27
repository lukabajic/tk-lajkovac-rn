import React, { useState } from "react";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import FormScreen from "../../components/FormScreen";
import FormFields from "../../components/FormFields";
import Loader from "../../components/Loader";
import { updateData } from "../../store/actions";
import { userPhoneForm } from "../../utils/forms";

const ChangeScreen = ({ user, error, updateData, loading, token }) => {
  const [form, setForm] = useState(userPhoneForm(user));

  const onSubmit = () => {
    const { phone } = form.values;

    updateData(token, "UPDATE_PHONE", { phone });

    setForm(userPhoneForm(user));
  };

  const isFormValid = () => form.fields.phone.meta.valid;

  if (loading) return <Loader />;

  return (
    <FormScreen title="Promenite ime" error={error}>
      <FormFields form={form} setForm={setForm} prefill={["phone"]} />
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
)(ChangeScreen);
