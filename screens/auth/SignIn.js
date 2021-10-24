import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import FormFields from '../../components/FormFields';
import Button from '../../components/Button';
import Link from '../../components/Link';
import { auth, authClearError, authFail } from '../../store/actions';
import colors from '../../utils/colors';
import { signInForm } from '../../utils/forms';
import Loader from '../../components/Loader';
import FormScreen from '../../components/FormScreen';

const SignIn = ({
  auth,
  error,
  loading,
  authClearError,
  authFail,
  navigation,
}) => {
  const [form, setForm] = useState(signInForm);

  useEffect(() => {
    authFail(null);
    return () => authClearError();
  }, []);

  const isFormValid = () =>
    form.fields.email.meta.valid && form.fields.password.meta.valid;

  const onSubmit = () => {
    const { email, password } = form.values;

    auth('/login', email, password).then((res) => {
      if (!res) {
        setForm(signInForm);
      }
    });
  };

  if (loading) return <Loader />;

  return (
    <FormScreen
      title="Prijavljivanje"
      error={error}
      bottomContent={<BottomContent navigation={navigation} />}
    >
        <FormFields form={form} setForm={setForm} />
        <View style={styles.buttonWrapper}>
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
  <View style={styles.bottomContentWrapper}>
    <Link
      darkGray
      style={{ textAlign: 'center', marginBottom: 18 }}
      action={() => navigation.navigate('ResetPassword')}
    >
      Ne možete da se ulogujete?
    </Link>
    <Link
      darkGray
      style={{ textAlign: 'center' }}
      action={() => navigation.replace('SignUp')}
    >
      Nemate nalog?
    </Link>
  </View>
);

const styles = StyleSheet.create({

  buttonWrapper: {
    marginBottom: 16,
  },
  bottomContentWrapper: {
    paddingBottom: 16,
  },
});

export default connect(
  (state) => ({ error: state.auth.error, loading: state.auth.loading }),
  { auth, authClearError, authFail }
)(SignIn);
