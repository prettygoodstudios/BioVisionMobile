import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import {goBack} from "../../history";
import baseStyles from "../../styles/main";

import Button from "../widgets/button";

class EncounterShow extends Component {

  render(){
    const {date, description} = this.props;
    console.log("Hello Encounters");
    console.log("Encounter Data", this.props);
    return(
      <View>
        <Text style={[baseStyles.h1]}>{date.toString()}</Text>
        <Text>{description}</Text>
        <Button content="Back" onPress={goBack}/>
      </View>
    );
  }
}


function mapStateToProps(state){
  return{
    ...state.encounters.encounter
  }
}

export default connect(mapStateToProps, actions)(EncounterShow);
