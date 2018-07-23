import React, {Component} from "react";
import {View, Text, TouchableWithoutFeedback} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";

import cardStyles from "../../styles/card";

class LocationsShow extends Component {


  render(){
    return(
      <View>
        <Text>{this.props.city}</Text>
        <Text>{this.props.full_address}</Text>
        <View style={[cardStyles.card]}>
          <Text style={[cardStyles.title]}>Encounters</Text>
          {this.props.encounters.map((e) => {
            return(
              <TouchableWithoutFeedback key={e.id}>
                <View style={[cardStyles.cardItem]}>
                  <Text style={[cardStyles.cardItemTitle]}>{e.date}</Text>
                  <Text style={[cardStyles.cardItemDescription]}>{e.description}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
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
