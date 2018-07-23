import {StyleSheet} from "react-native";

import { DARK_COLOR, PRIMARY_COLOR, OFF_WHITE, MAIN_FONT, SECONDARY_FONT} from "./main";

const defaultFont = {
  color: DARK_COLOR,
  fontFamily: MAIN_FONT
}
const lightColorFont = {
  color: OFF_WHITE,
  fontFamily: SECONDARY_FONT
}

const card = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "600",
    ...defaultFont,
    marginBottom: 40
  },
  card: {
    backgroundColor: OFF_WHITE,
    borderRadius: 5,
    flexDirection: 'column',
    padding: 20
  },
  cardItem: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  },
  cardItemTitle: {
    fontSize: 20,
    fontWeight: "500",
    ...lightColorFont
  },
  cardItemDescription: {
    fontSize: 15,
    fontWeight: "200",
    ...lightColorFont
  }
});

export default card;
