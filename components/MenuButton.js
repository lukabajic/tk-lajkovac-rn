import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  HeaderButtons,
  HeaderButton,
  Item,
} from "react-navigation-header-buttons";

import Colors from "../utils/colors";

const IoniconsHeaderButton = (props) => (
  <HeaderButton IconComponent={Ionicons} iconSize={23} {...props} />
);

const MenuButton = ({ navigation }) => (
  <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
    <Item
      title="menu"
      iconName="ios-menu"
      onPress={() => navigation.openDrawer()}
      color={Colors.darkGray}
    />
  </HeaderButtons>
);

export default MenuButton;
