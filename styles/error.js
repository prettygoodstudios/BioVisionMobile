import {StyleSheet} from "react-native";

import {PRIMARY_COLOR, OFF_WHITE, MAIN_FONT, DARK_COLOR} from "./main";

const styles = StyleSheet.create({
  error: {
    borderRadius: 5,
    backgroundColor: OFF_WHITE,
    color: DARK_COLOR,
    fontWeight: "700",
    fontFamily: MAIN_FONT,
    fontSize: 30,
    padding: 20,
    marginBottom: 20
  }
});

export default styles;
