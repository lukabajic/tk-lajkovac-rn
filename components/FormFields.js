import React from "react";
import { View, StyleSheet } from "react-native";

import Field from "./Field";

const FormFields = ({ form, onChange, onBlur, style = {} }) => (
  <View style={[styles.wrapper, style]}>
    {Object.keys(form.fields).map((field, index) => (
      <Field
        key={field}
        label={form.fields[field].label}
        type={form.fields[field].type}
        placeholder={form.fields[field].placeholder}
        meta={form.fields[field].meta}
        onChange={(value) => onChange(field, value)}
        onBlur={() => onBlur(field, form.values[field])}
        value={form.values[field]}
        autoFocus={form.fields[field].autoFocus}
        keyboardType={form.fields[field].keyboardType || "default"}
        spacing={Object.keys(form.fields).length > index}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default FormFields;
