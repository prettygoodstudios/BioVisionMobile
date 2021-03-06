import React, {Component} from "react";
import {View, Text, TouchableWithoutFeedback} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history, {goBack} from "../../history";
import {safeTitle} from "../../helpers/locations";

import baseStyles from "../../styles/main";

import Button from "../widgets/button";
import CollectionCard from "../widgets/collectionCard";
import Error from "../widgets/error";

class LocationsShow extends Component {

  constructor(){
    super();
    this.state = {
      error: ""
    }
  }

  goToEncounter = (id) => {
    this.props.getEncounter(id, () => history.push("/encounters/"+id),(e) => this.setState({ error: "Could not establish a connection with the server."}));
  }

  render(){
    return(
      <View>
        <Text style={[baseStyles.h1]}>{safeTitle(this.props)}</Text>
        <Text>{this.props.full_address}</Text>
        {this.props.user.email != "guest_user" && <Button onPress={() => history.push("/encounters/new") } content="Create Encounter"/> }
        <Error error={this.state.error}/>
        <CollectionCard title="Encounters" itemTitle="date" description="description" select={this.goToEncounter} items={this.props.encounters} />
        <Button onPress={() => goBack() } content="Back"/>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {currentLocation} = state.locations;
  const {user} = state.auth;
  return {
    ...currentLocation,
    user
  }
}

export default connect(mapStateToProps, actions)(LocationsShow);
