import React, { useEffect } from "react";
import { connect } from "react-redux";

import NoTokenStack from "./NoTokenStack";
import NoInfoScreen from "../screens/user/NoInfoScreen";
import PleaseVerifyScreen from "../screens/user/PleaseVerifyScreen";
import MainDrawer from "./MainDrawer";
import { fetchCurUser } from "../store/actions";
import Loader from "../components/Loader";

const MainNavigator = ({ token, user, loading, fetchCurUser }) => {
  if (!token) return <NoTokenStack />;

  if (loading) return <Loader />;

  useEffect(() => {
    if (token && !user) fetchCurUser(token);
  }, [token, user]);

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
    loading: state.user.loading,
  }),
  { fetchCurUser }
)(MainNavigator);
