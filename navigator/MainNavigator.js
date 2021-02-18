import React from "react";
import { connect } from "react-redux";

import NoTokenStack from "./NoTokenStack";
import NoInfoScreen from "../screens/user/NoInfoScreen";
import PleaseVerifyScreen from "../screens/user/PleaseVerifyScreen";
import MainDrawer from "./MainDrawer";

const MainNavigator = ({ token, user }) => {
  if (!token) return <NoTokenStack />;

  const { displayName, phone } = user.data;

  if (!displayName || !phone) return <NoInfoScreen />;

  const { emailVerified } = user;

  if (!emailVerified) return <PleaseVerifyScreen />;

  return <MainDrawer />;
};

export default connect((state) => ({
  token: state.auth.token,
  user: state.user.user,
}))(MainNavigator);
