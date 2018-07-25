import React, {Component} from "react";
import {Text, View, TextInput, Switch, Picker} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import baseStyles from "../../styles/main";
import styles from "../../styles/formStyles";

import Button from "../widgets/button";

class EncounterForm extends Component {
  constructor(){
    super();
    this.state = {
      error: ""
    }
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
    return(
      <View style={[styles.formContainer]}>
        <View style={[styles.formTitle]}>
          <Text style={[styles.formTitleText]}>Encounter</Text>
        </View>
        <Text style={[baseStyles.h1]}>Location</Text>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>Title</Text>
          <TextInput style={[styles.formInput]} placeholder="Title" autoCapitalize="none" onChangeText={(t) => console.log(t)}/>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>Address</Text>
          <TextInput style={[styles.formInput]} placeholder="Address" autoCapitalize="none" onChangeText={(t) => console.log(t)}/>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>City</Text>
          <TextInput style={[styles.formInput]} placeholder="City" autoCapitalize="none" onChangeText={(t) => console.log(t)}/>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>Address</Text>
          <TextInput style={[styles.formInput]} placeholder="Address" autoCapitalize="none" onChangeText={(t) => console.log(t)}/>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>State</Text>
          <TextInput style={[styles.formInput]} placeholder="State" autoCapitalize="none" onChangeText={(t) => console.log(t)}/>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>Country</Text>
          <TextInput style={[styles.formInput]} placeholder="Country" autoCapitalize="none" onChangeText={(t) => console.log(t)}/>
        </View>
        <Text style={[baseStyles.h1]}>Encounter</Text>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>Description</Text>
          <TextInput style={[styles.formInput]} placeholder="Description" autoCapitalize="none" onChangeText={(t) => console.log(t)}/>
        </View>
        <Text style={[baseStyles.h1]}>Species</Text>
        <Picker
          prompt="Pick a specie!"
          style={{ height: 50, width: 100, flex: 1 }}
          onValueChange={(itemValue, itemIndex) => console.log(`Val: ${itemValue}, Index: ${itemIndex}`)}>
          { this.props.species.map((s, i) => {
            return(
              <Picker.Item label={s.common} value={s.id} key={i} />
            );
          })}
        </Picker>
        <Text>Did not find the species you were looking? Then flip this switch to add a new one.</Text>
        <Switch />
        <Button onPress={ () => console.log("Submitting") } content="Create"/>
      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    ...state.species
  }
}

export default connect(mapStateToProps, actions)(EncounterForm);
