import React, {Component} from "react";
import {Text, View} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from "../../history";
import {safeTitle} from "../../helpers/locations";

import Map from "../widgets/map";
import CollectionCard from "../widgets/collectionCard";
import Error from "../widgets/error";

class LocationsIndex extends Component {
  constructor(){
    super();
    this.state = {
      region: {
        latitude:  40.296898,
        longitude: -111.694649,
        latitudeDelta: 0.3922,
        longitudeDelta: 0.3921
      },
      error: ""
    }
  }
  componentDidMount(){
    this.props.setLoading(true);
    this.props.locationsIndex(this.success, this.error);
  }

  success = (locations) => {
    const first = locations[0];
    this.setState({
      region: {
        latitude: first ? first.latitude : this.state.latitude,
        longitude: first ? first.longitude : this.state.longitude,
        latitudeDelta: 0.2422,
        longitudeDelta: 0.2421
      }
    });
    this.props.setLoading(false);
  }
  error = (e) => {
    this.setState({
      error: "Could not establish a connection with the server."
    });
    console.log("Server Error:", e);
    this.props.setLoading(false);
  }

  selectLocation = (id) => {
    this.props.getLocation(id,() => this.changeLocation(), () => this.error());
  }

  changeLocation = (id) => {
    history.push(`/locations/${id}`);
  }

  render(){
    return(
      <View>
        <Map region={this.state.region} locations={this.props.locations}/>
        <Error error={this.state.error}/>
        <CollectionCard description="full_address" mapTitle={safeTitle} select={this.selectLocation} title="Locations" items={this.props.locations}/>
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
