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
  }
});

export default styles;
