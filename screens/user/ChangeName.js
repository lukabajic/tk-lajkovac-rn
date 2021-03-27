import React, { useState } from "react";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import FormScreen from "../../components/FormScreen";
import FormFields from "../../components/FormFields";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { updateData } from "../../store/actions";
import { userNameForm } from "../../utils/forms";
import colors from "../../utils/colors";

const ChangeScreen = ({
  user,
  error,
  updateData,
  loading,
  token,
  navigation,
}) => {
  const [form, setForm] = useState(userNameForm(user));

  const onSubmit = async () => {
    const { firstName, lastName } = form.values;
    const displayName = `${firstName} ${lastName}`;

    await updateData(token, "UPDATE_NAME", { displayName });

    setForm(userNameForm(user));
    navigation.goBack();
  };

  const isFormValid = () =>
    form.fields.firstName.meta.valid && form.fields.lastName.meta.valid;

  if (loading) return <Loader />;

  return (
    <FormScreen title="Promenite ime" error={error}>
      <FormFields
        form={form}
        setForm={setForm}
        prefill={["firstName", "lastName"]}
      />
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
