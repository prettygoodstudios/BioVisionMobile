import React, {Component} from "react";
import {View, Text, AsyncStorage} from "react-native";
import {connect} from "react-redux";

import history from "../../history";
import * as actions from "../../actions";
import baseStyles from "../../styles/main";
import Button from "../widgets/button";
import {USER} from "../../storage";

class UserProfile extends Component {

  logOut = () => {
    this.props.logOut(this.clearData);
  }

  clearData = async () => {
    history.push("/");
    AsyncStorage.removeItem(USER);
  }

  render(){
    return(
      <View>
        <Text style={[baseStyles.h1]}>Profile</Text>
        <Text>{this.props.user.email}</Text>
        <Button content="Logout" onPress={ this.logOut }/>
      </View>
    );
  }
}

function mapStateToProps(state){
  const {user} = state.auth;
  return{
    user: user
  }
}


export default connect(mapStateToProps, actions)(UserProfile);
