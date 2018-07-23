import React, {Component} from "react";
import {Text, View} from "react-native";

import styles from "../../styles/navStyles";

class Nav extends Component {

  render() {
    const {title} = this.props;
    return(
      <View style={[styles.nav]}>
        <Text style={[styles.title]}>{title}</Text>
      </View>
    );
  }
}

export default Nav;
