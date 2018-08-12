import React, {Component} from "react";
import {View, Text, TextInput} from "react-native";
import {connect} from "react-redux";

import styles from "../../styles/formStyles";
import * as actions from "../../actions";
import history from "../../history";
import {USER} from "../../storage";

import Button from "../widgets/button";
import Error from "../widgets/error";

class SignupForm extends Component {

  constructor(){
    super();
    this.state = {
      display: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      error: ""
    }
  }

  handleSubmit = () => {
    this.props.setLoading(true);
    const {display, email, password, passwordConfirmation} = this.state;
    const params = {
      display,
      email,
      password,
      password_confirmation: passwordConfirmation
    }

    this.props.createAccount(params , this.success, this.error);
  }

  success = (u) => {
    this.props.setLoading(false);
    this.storeUser(u);
    history.push("/locations");
  }

  storeUser = async (user) => {
    try {
      await AsyncStorage.setItem(USER, `${user.authentication_token}, ${user.email}`);
    } catch (error) {
      console.log("Error Storing", error);
    }
  }

  error = (e) => {
    this.props.setLoading(false);
    this.setState({
      error: e
    });
  }

  handleInputChange = (t, f) => {
    switch(f){
      case "email":
        this.setState({email: t});
        break;
      case "display":
        this.setState({display: t});
        break;
      case "password":
        this.setState({password: t});
        break;
      case "passwordConfirmation":
        this.setState({passwordConfirmation: t});
        break;
      default:
        break;
    }
  }

  render(){
    return(
      <View style={[styles.formContainer]}>
        <View style={[styles.formTitle]}>
          <Text style={[styles.formTitleText]}>Sign Up</Text>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>Display Name</Text>
          <TextInput style={[styles.formInput]} placeholder="Display Name" autoCapitalize="none" onChangeText={(t) => this.handleInputChange(t, "display")} underlineColorAndroid="transparent"/>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>Email</Text>
          <TextInput style={[styles.formInput]} placeholder="Email" autoCapitalize="none" onChangeText={(t) => this.handleInputChange(t, "email")} underlineColorAndroid="transparent"/>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>Password</Text>
          <TextInput style={[styles.formInput]} placeholder="Password" secureTextEntry={true} onChangeText={(t) => this.handleInputChange(t, "password")} underlineColorAndroid="transparent"/>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>Confirm Password</Text>
          <TextInput style={[styles.formInput]} placeholder="Confirm Password" secureTextEntry={true} onChangeText={(t) => this.handleInputChange(t, "passwordConfirmation")} underlineColorAndroid="transparent"/>
        </View>
        <Error error={this.state.error}/>
        <Button onPress={ this.handleSubmit } content="Create Account"/>
        <View style={{flexDirection: "row", justifyContent: "center"}}>
          <Text style={styles.formLabel}>OR</Text>
        </View>
        <Button onPress={ () => history.push("/") } content="Sign In"/>
      </View>
    );
  }
}

function mapStateToProps(state){
 return{

 }
}

export default connect(mapStateToProps , actions)(SignupForm);
