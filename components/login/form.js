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
    this.props.setLoading(true);
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
    this.props.setLoading(true);
    try {
      const value = await AsyncStorage.getItem(USER);
      if (value !== null) {
        const user = {
          token: value.split(", ")[0],
          email: value.split(", ")[1]
        }
        this.props.authenticate(user,this.success,this.error);
      }else{
        this.props.setLoading(false);
      }
     } catch (error) {
       console.log("Error Retrieving User:", error);
       this.props.setLoading(false);
     }
  }

  error = (e) => {
    this.props.setLoading(false);
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
          <TextInput style={[styles.formInput]} placeholder="Email" autoCapitalize="none" onChangeText={(t) => this.handleInputChange(t, "email")} underlineColorAndroid="transparent"/>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>Password</Text>
          <TextInput style={[styles.formInput]} placeholder="Password" secureTextEntry={true} onChangeText={(t) => this.handleInputChange(t, "password")} underlineColorAndroid="transparent"/>
        </View>
        <Error error={this.state.error}/>
        <Button onPress={ this.handleSubmit } content="Login"/>
        <View style={{flexDirection: "row", justifyContent: "center"}}>
          <Text style={styles.formLabel}>OR</Text>
        </View>
        <Button onPress={ () => history.push("/signup") } content="Sign Up"/>
        <View style={{height: 50}}></View>
        <Button onPress={ () => this.props.useUnauthenticated(history.push("/locations")) } content="Use Unauthenticated" />
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
