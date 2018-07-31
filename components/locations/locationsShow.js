import React, {Component} from "react";
import {View, Text, TouchableWithoutFeedback} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history, {goBack} from "../../history";
import {safeTitle} from "../../helpers/locations";

import baseStyles from "../../styles/main";
import cardStyles from "../../styles/card";

import Button from "../widgets/button";
import ListCard from "../widgets/listCard";


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
              <ListCard title={e.date} description={e.description} id={e.id} key={e.id} callback={() => this.goToEncounter(e.id)}/>
            );
          })}
          {this.props.encounters.length == 0 && <Text style={[baseStyles.p]}>There are currently no encounters for this location.</Text>}
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
