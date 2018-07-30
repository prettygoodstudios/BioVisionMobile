import React, {Component} from "react";
import {View, Text, TouchableWithoutFeedback} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history, {goBack} from "../../history";
import {safeTitle} from "../../helpers/locations";

import baseStyles from "../../styles/main";
import cardStyles from "../../styles/card";

import Button from "../widgets/button";



class LocationsShow extends Component {


  goToEncounter = (id) => {
    this.props.getEncounter(id, () => history.push("/encounters/"+id),() => console.log(e));
  }

  render(){
    return(
      <View>
        <Text style={[baseStyles.h1]}>{safeTitle(this.props)}</Text>
        <Text>{this.props.full_address}</Text>
                <Button onPress={() => history.push("/encounters/new") } content="Create Encounter"/>
        <View style={[cardStyles.card]}>
          <Text style={[cardStyles.title]}>Encounters</Text>
          {this.props.encounters.map((e) => {
            return(
              <TouchableWithoutFeedback key={e.id} onPress={() => this.goToEncounter(e.id)}>
                <View style={[cardStyles.cardItem]}>
                  <Text style={[cardStyles.cardItemTitle]}>{e.date}</Text>
                  <Text style={[cardStyles.cardItemDescription]}>{e.description}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
        <Button onPress={() => goBack() } content="Back"/>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {currentLocation} = state.locations;
  return {
    ...currentLocation
  }
}

export default connect(mapStateToProps, actions)(LocationsShow);
