import React, {Component} from "react";
import {DatePickerIOS, DatePickerAndroid, View, Text, Platform} from "react-native";
import {Icon} from "react-native-elements";
import Button from "./button";


class DatePickerCrossPlatform extends Component {
  componentDidMount(){

  }

  handleAndroid = (d) => {
    const {date, setDate} = this.props;
    try {
      DatePickerAndroid.open({
        date
      }).then(({action, year, month, day}) => {
        if (action !== DatePickerAndroid.dismissedAction) {
          setDate(new Date(year, month, day));
        }
      });
    } catch ({code, message}) {
      console.warn('Cannot open date picker', code, message);
    }
  }

  render(){
    const {date, setDate} = this.props;
    if(Platform.OS === 'ios'){
      return(
        <DatePickerIOS date={date} onDateChange={ d => setDate(d)} mode="date"/>
      );
    }else{
      return(
        <Button content={`Pick Date - ${date.toString()}`} onPress={() => this.handleAndroid()}/>
      );
    }
  }
}

export default DatePickerCrossPlatform;
