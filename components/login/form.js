import React, {Component} from "react";
import {Text, TextInput, View, TouchableWithoutFeedback} from "react-native";
import axios from "axios";
import {connect} from "react-redux";

import styles from "../../styles/formStyles";
import * as actions from "../../actions";
import history from "../../history";

import Button from "../widgets/button";
import Error from "../widgets/error";

class LoginForm extends Component {
  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
      error: ""
    }
  }
  handleSubmit = () => {
    this.props.signIn(this.state, this.success, this.error);
    //this.props.history.push("/locations");
  }

  success = () => {
    history.push("/locations");
  }

  error = (e) => {
    const errorCode = e.toString().split(" ").pop();
    console.log("Error Code:",errorCode);
    switch(errorCode){
      case "401":
        console.log("Incorrect username or password");
        this.setState({
          error: "Incorrect username or password."
        });
        break;
      default:
        console.log("Cannot establish a connection with the server.");
        this.setState({
          error: "Cannot establish a connection with the server."
        });
        break;
    }
  }
  handleInputChange = (t, f) => {
    switch(f){
      case "email":
        this.setState({email: t});
        break;
      case "password":
        this.setState({password: t});
        break;
      default:
        break;
    }
  }

  render(){
    return(
      <View style={[styles.formContainer]}>
        <View style={[styles.formTitle]}>
          <Text style={[styles.formTitleText]}>Login</Text>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>Email</Text>
          <TextInput style={[styles.formInput]} placeholder="Email" autoCapitalize="none" onChangeText={(t) => this.handleInputChange(t, "email")}/>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>Password</Text>
          <TextInput style={[styles.formInput]} placeholder="Password" secureTextEntry={true} onChangeText={(t) => this.handleInputChange(t, "password")}/>
        </View>
        <Button onPress={ this.handleSubmit } content="Login"/>
        <Error error={this.state.error}/>
      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, actions)(LoginForm);
