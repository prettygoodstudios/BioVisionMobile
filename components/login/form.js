import React, {Component} from "react";
import {Text, TextInput, View, TouchableWithoutFeedback, AsyncStorage} from "react-native";
import axios from "axios";
import {connect} from "react-redux";

import styles from "../../styles/formStyles";
import * as actions from "../../actions";
import history from "../../history";
import {USER} from "../../storage";

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

  componentDidMount(){
    this.retrieveUser();
  }

  handleSubmit = () => {
    this.props.signIn(this.state, this.success, this.error);
    //this.props.history.push("/locations");
  }

  success = (data) => {
    this.storeUser(data);
    history.push("/locations");
  }

  storeUser = async (user) => {
    try {
      await AsyncStorage.setItem(USER, `${user.authentication_token}, ${user.email}`);
    } catch (error) {
      console.log("Error Storing", error);
    }
  }

  retrieveUser = async () => {
    try {
      const value = await AsyncStorage.getItem(USER);
      if (value !== null) {
        const user = {
          token: value.split(", ")[0],
          email: value.split(", ")[1]
        }
        this.props.authenticate(user,this.success,this.error);
      }
     } catch (error) {
       console.log("Error Retrieving User:", error);
     }
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
