import React, { useEffect } from "react";
import { connect } from "react-redux";

import NoTokenStack from "./NoTokenStack";
import NoInfoScreen from "../screens/user/NoInfoScreen";
import PleaseVerifyScreen from "../screens/user/PleaseVerifyScreen";
import MainDrawer from "./MainDrawer";
import { checkExpiration } from "../store/actions";

const MainNavigator = ({ token, user, loading, checkExpiration }) => {
  useEffect(() => {
    if (token && !user) checkExpiration();
  }, [token, user]);

  if (!token || !user) return <NoTokenStack />;

  const displayName = user?.data?.displayName;
  const phone = user?.data?.phone;

  if (!displayName || !phone) return <NoInfoScreen />;

  const { emailVerified } = user;

  if (!emailVerified) return <PleaseVerifyScreen />;

  return <MainDrawer />;
};

export default connect(
  (state) => ({
    token: state.auth.token,
    user: state.user.user,
  }),
  { checkExpiration }
)(MainNavigator);
