import React, {Component} from "react";
import {TouchableWithoutFeedback, View, Text} from "react-native";

import styles from "../../styles/formStyles";

export default function(props) {
  const {content, onPress} = props;
  return(
    <TouchableWithoutFeedback onPress={ () => onPress() }>
      <View style={[styles.formButton]}>
        <Text style={[styles.formButtonText]}>{content}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
