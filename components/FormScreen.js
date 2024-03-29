import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import Colors from '../utils/colors';
import Alert from './Alert';
import { LargeTitle, Headline } from './Typography';

const FormScreen = ({ children, title, subtitle, bottomContent, error }) => (
  <SafeAreaView style={styles.screen}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={40}
      style={styles.wrapper}
    >
      <ScrollView bounces={false} contentContainerStyle={styles.form}>
        <View style={styles.formAndButton}>
          {(title || subtitle) && (
            <View style={styles.header}>
              {title && <LargeTitle style={styles.title}>{title}</LargeTitle>}
              {subtitle && <Headline style={styles.title}>{subtitle}</Headline>}
            </View>
          )}
          {error && <Alert message={error} type="danger" />}
          {children}
        </View>
        {bottomContent}
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingBottom: 10,
  },
  wrapper: {
    flexGrow: 1,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  formAndButton: {
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: Colors.black,
  },
  header: {
    marginBottom: 40,
  },
});

export default FormScreen;
