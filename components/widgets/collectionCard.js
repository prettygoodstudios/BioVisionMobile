import React from "react";
import {View, Text} from "react-native";

import cardStyles from "../../styles/card";
import baseStyles from "../../styles/main";

import ListCard from "./listCard";

const CollectionCard = (props) => {
  const {items, title, itemTitle, description, mapTitle, mapDescription, select} = props;
  return(
    <View style={[cardStyles.card]}>
      <Text style={[cardStyles.title]}>{title}</Text>
      { items.map((i) => {
        return (
          <ListCard title={ mapTitle ? mapTitle(i) : i[itemTitle]} description={mapDescription ? mapDescription(i) : i[description] } callback={() => select(i.id)} id={i.id} key={i.id}/>
        );
      })}
      {items.length == 0 && <Text style={[baseStyles.p]}>There are currently no encounters available.</Text>}
    </View>
  );
}

export default CollectionCard;
