import React from "react";
import { View, StyleSheet } from "react-native";

import Field from "./Field";
import { validate } from "../utils/validate";

const FormFields = ({ form, setForm, style = {} }) => {
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

  return (
    <View style={[styles.wrapper, style]}>
      {Object.keys(form.fields).map((field, index) => (
        <Field
          key={field}
          label={form.fields[field].label}
          type={form.fields[field].type}
          placeholder={form.fields[field].placeholder}
          meta={form.fields[field].meta}
          onChange={(value) => onChangeHandler(field, value)}
          onBlur={() => onBlurHandler(field, form.values[field])}
          value={form.values[field]}
          autoFocus={form.fields[field].autoFocus}
          keyboardType={form.fields[field].keyboardType || "default"}
          spacing={Object.keys(form.fields).length > index}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default FormFields;
