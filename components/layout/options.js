import React, {Component} from "react";
import {View, Text, TouchableWithoutFeedback} from "react-native";
import { Icon } from 'react-native-elements';
import {connect} from "react-redux";

import history from "../../history";
import styles from "../../styles/options";



const Option = (selected, icon, updateOptions) => {
  const active = selected == icon;
  return(
    <TouchableWithoutFeedback onPress={() => updateOptions()} >
      <View style={ !active ? styles.option : styles.selectedOption}>
        <Icon name={icon} iconStyle={ !active ? styles.optionText : styles.selectedOptionText} />
      </View>
    </TouchableWithoutFeedback>
  );
}

class Options extends Component {
  constructor(){
    super();
    this.state = {
      selectedOption: "place"
    }
  }

  updateOptions = (route, option) => {
    history.push(route);
    this.setState({
      selectedOption: option
    });
  }

  render(){
    const {authenticated} = this.props
    if(!this.props.user.authenticated){
      return <View></View>
    }

    return(
      <View style={[styles.wrapper]}>
        {Option(this.state.selectedOption, "place", () => this.updateOptions("/locations/", "place"))}
        {Option(this.state.selectedOption, "today", () => this.updateOptions("/encounters/getDate/1", "today"))}
        {Option(this.state.selectedOption, "face", () => this.updateOptions("/user/profile", "face"))}
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

export default connect(mapStateToProps,null)(Options);
