import React from "react";
import {View} from "react-native";

const TabView = (props) => {
  const {selectedTab, tabs} = props;
  const selected = tabs.filter((t) => {return t.name == selectedTab;});
  if(selected.length == 0){
    return <View></View>;
  }
  const tabViews = selected.map((t, i) => {
    return(
      <View key={i}>
        {t.component}
      </View>
    )
  });
  return tabViews;
}

export default TabView;
