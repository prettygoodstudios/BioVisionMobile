import React from "react";
import {View, TouchableOpacity, Text} from "react-native";

import cardStyles from "../../styles/card";

const ListCard = (props) => {
  const {callback, id, title, description} = props;
  return(
    <TouchableOpacity onPress={() => callback()} key={id} activeOpacity={0.7}>
      <View style={[cardStyles.cardItem]}>
        <Text style={[cardStyles.cardItemTitle]}>{title}</Text>
        <Text style={[cardStyles.cardItemDescription]}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ListCard;
