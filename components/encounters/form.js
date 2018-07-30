import React, {Component} from "react";
import {Text, View, TextInput, Switch, Picker} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import baseStyles from "../../styles/main";
import styles from "../../styles/formStyles";

import Button from "../widgets/button";
import Error from "../widgets/error";

class EncounterForm extends Component {
  constructor(props){
    super(props);
    let addressArray = this.props.full_address.split(",").map(a => a.trim());
    if (addressArray.length != 4){
      addressArray.unshift("");
    }
    this.state = {
      error: "",
      specie: 1,
      newSpecie: false,
      title: this.props.title,
      address: addressArray[0],
      city: addressArray[1],
      state: addressArray[2],
      country: addressArray[3],
      common: "",
      scientific: "",
      description: "",
      date: ""
    }
  }

  submitForm = () => {
    const params = {
      ...this.state,
      toggleSpecie: this.state.newSpecie,
      token: this.props.user.authentication_token,
      email: this.props.user.email
    }
    this.props.action(params, (id) => this.props.success(id), (e) => this.error(e) )
  }

  error = (e) => {
    console.log("Error Encountered:", e);
    let errorMessage = "Something went wrong";
    console.log("Error Type: ", typeof e);
    switch(typeof e){
      case "object":
        if(Array.isArray(e)){
          errorMessage = e[0];
        }else if(e.toString() != "Error: Network Error"){
          const errors = e[Object.keys(e)[0]];
          errorMessage = errors[0];
        }else{
          errorMessage = "Could not establish connection to the server."
        }
        break;
      case "string":
        errorMessage = e;
        break;
      default:
        errorMessage = "Something went wrong."
        break;
    }
    console.log("Error Message",errorMessage);
    this.setState({
      error: errorMessage
    });
  }

  componentDidMount(){
    this.props.allSpecies(this.gotSpecies,this.noSpecies);
  }

  gotSpecies = () => {
    console.log("Got Species");
  }

  noSpecies = () => {
    console.log("No species");
  }

  render(){
    let addressArray = this.props.full_address.split(",").map(a => a.trim());
    if (addressArray.length != 4){
      addressArray.unshift("");
    }
    return(
      <View style={[styles.formContainer]}>
        <View style={[styles.formTitle]}>
          <Text style={[styles.formTitleText]}>Encounter</Text>
        </View>
        <Text style={[baseStyles.h1]}>Location</Text>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>Title</Text>
          <TextInput style={[styles.formInput]} placeholder="Title" autoCapitalize="none" onChangeText={(t) => this.setState({title: t})} defaultValue={this.props.title} value={this.state.title}/>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>Address</Text>
          <TextInput style={[styles.formInput]} placeholder="Address" autoCapitalize="none" onChangeText={(t) => this.setState({address: t})} defaultValue={addressArray[0]} value={this.state.address}/>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>City</Text>
          <TextInput style={[styles.formInput]} placeholder="City" autoCapitalize="none" onChangeText={(t) => this.setState({city: t})} defaultValue={addressArray[1]} value={this.state.city}/>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>State</Text>
          <TextInput style={[styles.formInput]} placeholder="State" autoCapitalize="none" onChangeText={(t) => this.setState({state: t})} defaultValue={addressArray[2]} value={this.state.state}/>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>Country</Text>
          <TextInput style={[styles.formInput]} placeholder="Country" autoCapitalize="none" onChangeText={(t) => this.setState({country: t})} defaultValue={addressArray[3]} value={this.state.country}/>
        </View>
        <Text style={[baseStyles.h1]}>Encounter</Text>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>Description</Text>
          <TextInput style={[styles.formInput]} placeholder="Description" autoCapitalize="none" onChangeText={(t) => this.setState({description: t})} value={this.state.description}/>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>Date</Text>
          <TextInput style={[styles.formInput]} placeholder="Date" autoCapitalize="none" onChangeText={(t) => this.setState({date: t})} value={this.state.date}/>
        </View>
        <Text style={[baseStyles.h1]}>Specie</Text>
        { !this.state.newSpecie &&
          <View>
            <Text>Select a specie.</Text>
            <Picker
              prompt="Pick a specie!"
              style={[styles.picker]}
              itemStyle={[styles.pickerItem]}
              selectedValue={this.state.specie}
              onValueChange={(itemValue, itemIndex) => this.setState({ specie: itemValue})}>
              { this.props.species.map((s, i) => {
                return(
                  <Picker.Item label={s.common} value={s.id} key={i} />
                );
              })}
            </Picker>
            <Text>Did not find the species you were looking? Then flip this switch to add a new one.</Text>
          </View>
        }
        <Switch onValueChange={(v) => this.setState({newSpecie: v})} value={this.state.newSpecie}/>
        { this.state.newSpecie &&
          <View>
            <View style={[styles.formGroup]}>
              <Text style={[styles.formLabel]}>Common Name</Text>
              <TextInput style={[styles.formInput]} placeholder="Common Name" autoCapitalize="none" onChangeText={(t) => this.setState({common: t})} value={this.state.common}/>
            </View>
            <View style={[styles.formGroup]}>
              <Text style={[styles.formLabel]}>Scientific Name</Text>
              <TextInput style={[styles.formInput]} placeholder="Scientific Name" autoCapitalize="none" onChangeText={(t) => this.setState({scientific: t})} value={this.state.scientific}/>
            </View>
          </View>
        }
        <Error error={this.state.error}/>
        <Button onPress={ () => this.submitForm() } content="Create"/>
      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    ...state.species,
    ...state.locations.currentLocation,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, actions)(EncounterForm);
