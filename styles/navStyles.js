import {StyleSheet} from "react-native";

import {PRIMARY_COLOR, OFF_WHITE, MAIN_FONT} from "./main";

const styles = StyleSheet.create({
  nav: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingBottom: 20
  },
  title: {
    fontSize: 30,
    fontFamily: MAIN_FONT,
    color: OFF_WHITE
  },
  menu: {
    backgroundColor: OFF_WHITE,
    width: 50,
    height: 50,
    borderRadius: 25,
    position: "absolute",
    right: 20,
    bottom: 20,
    overflow: "hidden"
  },
  menuImage: {
    width: 50,
    height: 50,
    position: "absolute",
    top: 10
  }
});

export default styles;
