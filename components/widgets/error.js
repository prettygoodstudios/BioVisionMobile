import React from "react";
import {View, Text} from "react-native";

import styles from "../../styles/error";

export default function(props){
  const { error } = props;

  if(error == ""){
    return (
      <View></View>
    );
  }

  return (
    <Text style={[styles.error]}>{error}</Text>
  );
}
