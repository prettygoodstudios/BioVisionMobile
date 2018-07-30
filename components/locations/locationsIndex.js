import React, {Component} from "react";
import {Text, View, TouchableWithoutFeedback} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from "../../history";
import {safeTitle} from "../../helpers/locations";
import cardStyles from "../../styles/card";

import Map from "../widgets/map";
import ListCard from "../widgets/listCard";

class LocationsIndex extends Component {
  constructor(){
    super();
    this.state = {
      region: {
        latitude:  40.296898,
        longitude: -111.694649,
        latitudeDelta: 0.3922,
        longitudeDelta: 0.3921
      }
    }
  }
  componentDidMount(){
    this.props.locationsIndex(this.success,this.error);
  }

  success = (locations) => {
    const first = locations[0];
    console.log("My Location",first);
    this.setState({
      region: {
        latitude: first.latitude,
        longitude: first.longitude,
        latitudeDelta: 0.2422,
        longitudeDelta: 0.2421
      }
    });
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
    console.log("Locations Log",this.props.locations);
    return(
      <View>
        <Map region={this.state.region} locations={this.props.locations}/>
        <View style={[cardStyles.card]}>
          <Text style={[cardStyles.title]}>Locations</Text>
          { this.props.locations.map((l) => {
            return (
              <ListCard title={safeTitle(l)} description={l.full_address} callback={() => this.selectLocation(l.id)} id={l.id} key={l.id}/>
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
