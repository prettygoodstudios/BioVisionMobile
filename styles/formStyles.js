import {StyleSheet} from "react-native";

import {PRIMARY_COLOR, OFF_WHITE, SECONDARY_FONT, MAIN_FONT, DARK_COLOR} from "./main";

const formGroupFontStyles = {
  fontSize: 30,
  fontFamily: SECONDARY_FONT,
  color: DARK_COLOR
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  formTitle: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40
  },
  formTitleText: {
    fontFamily: MAIN_FONT,
    fontSize: 40,
    fontWeight: "700",
    color: DARK_COLOR
  },
  formGroup: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 40
  },
  formLabel: {
    ...formGroupFontStyles
  },
  formInput: {
    ...formGroupFontStyles,
    backgroundColor: OFF_WHITE,
    padding: 10,
    borderRadius: 3
  },
  formButton: {
    backgroundColor: PRIMARY_COLOR,
    padding: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  formButtonText: {
    color: OFF_WHITE,
    fontSize: 30
  }
});

export default styles;
