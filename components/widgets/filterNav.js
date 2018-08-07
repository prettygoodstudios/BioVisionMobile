import React, {Component} from "react";
import {View, Text, TouchableWithoutFeedback} from "react-native";
import { Icon } from 'react-native-elements';
import {connect} from "react-redux";

import history from "../../history";
import styles from "../../styles/options";



const Option = (selected, icon, updateOptions, key) => {
  const active = selected == icon;
  return(
    <TouchableWithoutFeedback onPress={() => updateOptions()} key={key}>
      <View style={ !active ? styles.option : [styles.selectedOption, styles.selectedNavItem]}>
        <Icon name={icon} iconStyle={ !active ? styles.optionText : styles.selectedOptionText} />
      </View>
    </TouchableWithoutFeedback>
  );
}

class FilterNav extends Component {
  constructor(){
    super();
    this.state = {
      selectedOption: "place"
    }
  }

  updateOptions = (callBack, option) => {
    callBack(option);
    this.setState({
      selectedOption: option
    });
  }

  render(){
    return(
      <View style={[styles.wrapper, styles.filterNav]}>
        {
          this.props.options.map( ({icon, callBack}, i) => {
            return Option(this.state.selectedOption, icon, () => this.updateOptions(callBack, icon), i);
          })
        }
      </View>
    );
  }
}

function mapStateToProps(state){
  const {user, authenticated} = state.auth;
  console.log("Options Auth:",state.auth);
  return{
    user: user
  }
}

export default connect(mapStateToProps,null)(FilterNav);
