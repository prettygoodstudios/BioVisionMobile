import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 9,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  body: {
    flexBasis: '70%',
    padding: 20,
  },
  h1: {
    fontSize: 30,
    fontWeight: "500",
    color: DARK_COLOR,
    fontFamily: MAIN_FONT
  },
  bottomMargin: {
    height: 20
  },
  p: {
    fontSize: 15,
    fontWeight: "400",
    color: DARK_COLOR,
    fontFamily: MAIN_FONT
  }
});

const PRIMARY_COLOR = "#6ac9c0";
const OFF_WHITE = "#ECECEC";
const MAIN_FONT = 'avenir-medium';
const SECONDARY_FONT = 'avenir-medium';
const DARK_COLOR = "#6c6c6c";

export default styles;

export { PRIMARY_COLOR, OFF_WHITE, MAIN_FONT, SECONDARY_FONT, DARK_COLOR};
