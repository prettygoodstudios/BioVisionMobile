import {StyleSheet} from "react-native";

import {PRIMARY_COLOR} from "./main";

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 400,
    flex: 1
  },
  marker: {
    width: 50,
    height: 50,
    position: "relative"
  },
  callout: {
    width: 200,
    backgroundColor: "white",
    flexDirection: "column"
  },
  markerIcon: {
    color: PRIMARY_COLOR,
    fontSize: 50,
    position: "absolute",
    top: -20,
    left: 0
  }
});

export default styles;
