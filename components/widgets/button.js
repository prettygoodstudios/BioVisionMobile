import React, {Component} from "react";
import {TouchableOpacity, View, Text} from "react-native";

import styles from "../../styles/formStyles";

export default function(props) {
  const {content, onPress} = props;
  return(
    <TouchableOpacity onPress={ () => onPress() } activeOpacity={0.7}>
      <View style={[styles.formButton]}>
        <Text style={[styles.formButtonText]}>{content}</Text>
      </View>
    </TouchableOpacity>
  );
}
