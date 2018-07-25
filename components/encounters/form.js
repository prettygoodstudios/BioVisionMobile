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
      error: "",
      specie: -1,
      newSpecie: false
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
          <TextInput style={[styles.formInput]} placeholder="Title" autoCapitalize="none" onChangeText={(t) => console.log(t)} defaultValue={this.props.title}/>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>Address</Text>
          <TextInput style={[styles.formInput]} placeholder="Address" autoCapitalize="none" onChangeText={(t) => console.log(t)} defaultValue={addressArray[0]}/>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>City</Text>
          <TextInput style={[styles.formInput]} placeholder="City" autoCapitalize="none" onChangeText={(t) => console.log(t)} defaultValue={addressArray[1]}/>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>State</Text>
          <TextInput style={[styles.formInput]} placeholder="State" autoCapitalize="none" onChangeText={(t) => console.log(t)} defaultValue={addressArray[2]}/>
        </View>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>Country</Text>
          <TextInput style={[styles.formInput]} placeholder="Country" autoCapitalize="none" onChangeText={(t) => console.log(t)} defaultValue={addressArray[3]}/>
        </View>
        <Text style={[baseStyles.h1]}>Encounter</Text>
        <View style={[styles.formGroup]}>
          <Text style={[styles.formLabel]}>Description</Text>
          <TextInput style={[styles.formInput]} placeholder="Description" autoCapitalize="none" onChangeText={(t) => console.log(t)}/>
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
              <TextInput style={[styles.formInput]} placeholder="Common Name" autoCapitalize="none" onChangeText={(t) => console.log(t)}/>
            </View>
            <View style={[styles.formGroup]}>
              <Text style={[styles.formLabel]}>Scientific Name</Text>
              <TextInput style={[styles.formInput]} placeholder="Scientific Name" autoCapitalize="none" onChangeText={(t) => console.log(t)}/>
            </View>
          </View>
        }
        <Button onPress={ () => console.log("Submitting") } content="Create"/>
      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    ...state.species,
    ...state.locations.currentLocation
  }
}

export default connect(mapStateToProps, actions)(EncounterForm);
