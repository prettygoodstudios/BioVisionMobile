import React, {Component} from "react";
import {Text, View, TouchableWithoutFeedback} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from "../../history";

import cardStyles from "../../styles/card";

class LocationsIndex extends Component {
  constructor(){
    super();
    this.state = {
    }
  }
  componentDidMount(){
    this.props.locationsIndex(this.success,this.error);
  }

  success = () => {
    console.log("Success");
  }
  error = (e) => {
    console.log("Error",e);
  }

  selectLocation = (id) => {
      this.props.getLocation(id,this.changeLocation, this.error);
  }

  changeLocation = (id) => {
    history.push(`/locations/${id}`);
  }

  render(){
    return(
      <View>
        <Text>{this.props.user.email}</Text>
        <Text>{this.props.user.id}</Text>
        <Text>Locations</Text>
        <View style={[cardStyles.card]}>
          <Text style={[cardStyles.title]}>Locations</Text>
          { this.props.locations.map((l) => {
            return (
              <TouchableWithoutFeedback onPress={() => this.selectLocation(l.id)} key={l.id}>
                <View style={[cardStyles.cardItem]}>
                  <Text style={[cardStyles.cardItemTitle]}>{l.city}</Text>
                  <Text style={[cardStyles.cardItemDescription]}>{l.full_address}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </View>
    );
  }
}

function mapStateToProps(state){
  const {user} = state.auth;
  const {locations} = state.locations;
  return {
    user: user,
    locations: locations
  };
}

export default connect(mapStateToProps, actions)(LocationsIndex);
