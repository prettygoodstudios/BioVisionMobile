import {StyleSheet} from "react-native";
import {PRIMARY_COLOR, OFF_WHITE, MAIN_FONT, DARK_COLOR} from "./main";

const styles = StyleSheet.create({
  spinner: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 5,
    position: "absolute",
    top: 300,
    left: "50%",
    width: 100,
    zIndex: 9999999,
    transform: [{translateX: -50}],
    flexDirection: "row",
    justifyContent: "center"
  },
  spinnerIcon: {
    color: OFF_WHITE,
    fontFamily: MAIN_FONT,
    fontSize: 100
  },
  spinnerMask: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 9999
  }
});

export default styles;
