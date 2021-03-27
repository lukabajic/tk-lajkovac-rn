import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { LargeTitle, Headline, TitleThree } from "../../components/Typography";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import Info from "../../components/Info";
import Button from "../../components/Button";
import Colors from "../../utils/colors";

const DataSection = ({ to, data, navigation }) => (
  <TouchableOpacity
    style={styles.section}
    onPress={() => navigation.navigate(to)}
    activeOpacity={0.7}
  >
    <View style={styles.sectionView}>
      {data?.map((d, i) => (
        <Info {...d} key={i} spacing={i < data.length - 1} />
      ))}
    </View>
    <Ionicons name="ios-chevron-forward" size={28} color={Colors.black} />
  </TouchableOpacity>
);

const UserAllSettings = ({ user, navigation }) => {
  const { displayName, phone } = user.data;
  const { email } = user;

  const all = [
    {
      to: "ChangeName",
      data: [
        { label: "Ime", value: displayName.split(" ")[0] },
        { label: "Prezime", value: displayName.split(" ")[1] },
      ],
    },
    {
      to: "PhoneEdit",
      data: [{ label: "Broj telefona", value: phone }],
    },
    {
      to: "EmailEdit",
      data: [{ label: "Email", value: email }],
    },
    {
      to: "PasswordEdit",
      data: [{ label: "Šifra", value: "********" }],
    },
  ];

  return (
    <View style={styles.screen}>
      <LargeTitle style={{ textAlign: "center", color: Colors.black }}>
        Informacije
      </LargeTitle>
      <Headline style={styles.header}>Klikom možete da promenite.</Headline>
      <ScrollView contentContainerStyle={styles.list}>
        {all.map((i) => (
          <DataSection navigation={navigation} key={i.to} {...i} />
        ))}
        {/* <TitleThree
          style={{ textAlign: "center", color: Colors.black, marginBottom: 16 }}
        >
          Dodatne (opcionalno)
        </TitleThree> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    marginBottom: 32,
    marginHorizontal: 16,
    textAlign: "center",
    color: Colors.black,
  },
  list: {
    paddingHorizontal: 16,
  },
  section: {
    width: "100%",
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomColor: "rgba(38, 35, 34, 0.2)",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionView: {
    marginRight: 16,
  },
  notLast: {
    marginBottom: 8,
  },
});

export default connect((state) => ({
  user: state.user.user,
}))(UserAllSettings);
