import React from "react";
import { Text, StyleSheet } from "react-native";

export const LargeTitle = ({ children, style = {} }) => (
  <Text style={[styles.largeTitle, style]}>{children}</Text>
);

export const TitleOne = ({ children, style = {} }) => (
  <Text style={[styles.titleOne, style]}>{children}</Text>
);

export const TitleTwo = ({ children, style = {} }) => (
  <Text style={[styles.titleTwo, style]}>{children}</Text>
);

export const TitleThree = ({ children, style = {} }) => (
  <Text style={[styles.titleThree, style]}>{children}</Text>
);

export const Headline = ({ children, style = {} }) => (
  <Text style={[styles.headline, style]}>{children}</Text>
);

export const Subheadline = ({ children, style = {} }) => (
  <Text style={[styles.subheadline, style]}>{children}</Text>
);

export const Body = ({ children, style = {} }) => (
  <Text style={[styles.body, style]}>{children}</Text>
);

export const Callout = ({ children, style = {} }) => (
  <Text style={[styles.callout, style]}>{children}</Text>
);

export const CaptationOne = ({ children, style = {} }) => (
  <Text style={[styles.captationOne, style]}>{children}</Text>
);

export const CaptationTwo = ({ children, style = {} }) => (
  <Text style={[styles.captationTwo, style]}>{children}</Text>
);

export const Footnote = ({ children, style = {} }) => (
  <Text style={[styles.footnote, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  largeTitle: {
    fontSize: 34,
    letterSpacing: 0.37,
    lineHeight: 41,
    fontWeight: "700",
  },
  titleOne: {
    fontSize: 28,
    letterSpacing: 0.36,
    lineHeight: 34,
    fontWeight: "700",
  },
  titleTwo: {
    fontSize: 22,
    letterSpacing: 0.35,
    lineHeight: 28,
    fontWeight: "700",
  },
  titleThree: {
    fontSize: 20,
    letterSpacing: 0.38,
    lineHeight: 24,
    fontWeight: "700",
  },
  headline: {
    fontSize: 17,
    letterSpacing: -0.41,
    lineHeight: 22,
    fontWeight: "600",
  },
  subheadline: {
    fontSize: 15,
    letterSpacing: -0.24,
    lineHeight: 20,
    fontWeight: "600",
  },
  body: {
    fontSize: 17,
    letterSpacing: -0.41,
    lineHeight: 22,
  },
  callout: {
    fontSize: 16,
    letterSpacing: -0.32,
    lineHeight: 21,
  },
  captationOne: {
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 16,
  },
  captationTwo: {
    fontSize: 11,
    letterSpacing: 0.07,
    lineHeight: 13,
  },
  footnote: {
    fontSize: 13,
    letterSpacing: -0.08,
    lineHeight: 18,
  },
});
