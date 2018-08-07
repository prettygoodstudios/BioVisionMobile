import {StyleSheet} from "react-native";

import {OFF_WHITE, PRIMARY_COLOR, DARK_COLOR, MAIN_FONT} from "./main";

const styles = StyleSheet.create({
  wrapper: {
    flexBasis: 50,
    backgroundColor: OFF_WHITE,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  option: {
    flex: 1,
    borderColor: DARK_COLOR,
    borderWidth: 0,
    height: "100%",
    flexDirection: "column",
    justifyContent: "center"
  },
  optionText: {
    fontFamily: MAIN_FONT,
    textAlign: "center",
    color: DARK_COLOR,
    fontSize: 50
  },
  selectedOption: {
    flex: 1,
    borderColor: DARK_COLOR,
    borderWidth: 0,
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: PRIMARY_COLOR
  },
  selectedOptionText: {
    fontFamily: MAIN_FONT,
    textAlign: "center",
    color: OFF_WHITE,
    fontSize: 50
  },
  filterNav: {
    borderRadius: 10,
    height: 100
  },
  selectedNavItem: {
    borderRadius: 10
  }
});

export default styles;
