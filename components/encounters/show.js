import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history, {goBack} from "../../history";
import {safeTitle} from "../../helpers/locations";
import baseStyles from "../../styles/main";

import Button from "../widgets/button";

class EncounterShow extends Component {


  componentDidMount(){
    this.props.getLocation(this.props.location_id, () => console.log("Got Location"), () => console.log("Did not get location."));
  }



  render(){
    const {date, description, location, user_id} = this.props;
    const {id} = location;
    console.log("Hello Encounters");
    console.log("Encounter Data", this.props);
    return(
      <View>
        <Text style={[baseStyles.h1]}>{date.toString()}</Text>
        <Text>{description}</Text>
        <Button content={safeTitle(location)} onPress={() => history.push("/locations/"+id)} />
        { this.props.user.id == user_id && <Button content="Edit" onPress={() => history.push("/encounters/edit/"+this.props.id)} />}
        <Button content="Back" onPress={goBack}/>
      </View>
    );
  }
}


function mapStateToProps(state){
  return{
    ...state.encounters.encounter,
    location: state.locations.currentLocation,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, actions)(EncounterShow);
