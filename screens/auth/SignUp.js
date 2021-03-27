import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";

import FormFields from "../../components/FormFields";
import Button from "../../components/Button";
import Link from "../../components/Link";
import colors from "../../utils/colors";
import { auth, authClearError, authFail } from "../../store/actions";
import { signUpForm } from "../../utils/forms";
import Loader from "../../components/Loader";
import FormScreen from "../../components/FormScreen";

const SignUp = ({
  auth,
  error,
  loading,
  authClearError,
  authFail,
  navigation,
}) => {
  const [form, setForm] = useState(signUpForm);

  useEffect(() => {
    authFail(null);
    return () => authClearError();
  }, []);

  const isFormValid = () =>
    form.fields.email.meta.valid &&
    form.fields.password.meta.valid &&
    form.fields.confPassword.meta.valid;

  const onSubmit = () => {
    const { email, password } = form.values;

    auth("/register", email, password);

    setForm(signUpForm);
  };

  if (loading) return <Loader />;

  return (
    <FormScreen
      title="Registracija"
      error={error}
      bottomContent={<BottomContent navigation={navigation} />}
    >
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
};

const BottomContent = ({ navigation }) => (
  <View>
    <Link
      darkGray
      style={{ textAlign: "center" }}
      action={() => navigation.replace("SignIn")}
    >
      Već imate nalog?
    </Link>
  </View>
);

export default connect(
  (state) => ({ error: state.auth.error, loading: state.auth.loading }),
  { auth, authClearError, authFail }
)(SignUp);
