import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";

import history from "../../history";
import * as actions from "../../actions";

import EncounterForm from "./form";

class NewEncounter extends Component {

  success = (id) => {
    history.push("/locations/"+id);
  }

  render(){
    return(
      <EncounterForm success={this.success} action={this.props.createEncounter}/>
    );
  }
}

function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps, actions)(NewEncounter);