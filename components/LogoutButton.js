import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  HeaderButtons,
  HeaderButton,
  Item,
} from "react-navigation-header-buttons";
import { connect } from "react-redux";

import Colors from "../utils/colors";
import { logout } from "../store/actions";

const IoniconsHeaderButton = (props) => (
  <HeaderButton IconComponent={Ionicons} iconSize={23} {...props} />
);

const LogoutButton = ({ logout }) => (
  <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
    <Item
      title="logout"
      iconName="log-out-outline"
      onPress={logout}
      color={Colors.darkGray}
    />
  </HeaderButtons>
);

export default connect(null, { logout })(LogoutButton);
