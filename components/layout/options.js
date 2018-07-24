import React, {Component} from "react";
import {View, Text, TouchableWithoutFeedback} from "react-native";
import {connect} from "react-redux";

import history from "../../history";
import styles from "../../styles/options";

class Options extends Component {
  render(){
    const {authenticated} = this.props
    if(!this.props.user.authenticated){
      return <View></View>
    }
    return(
      <View style={[styles.wrapper]}>
        <TouchableWithoutFeedback onPress={() => history.push("/locations")} >
          <View style={[styles.option]}>
            <Text style={[styles.optionText]}>Locations</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => history.push("/user/profile")} style={[styles.option]}>
          <View style={[styles.option]}>
            <Text style={[styles.optionText]}>Profile</Text>
          </View>
        </TouchableWithoutFeedback>
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
