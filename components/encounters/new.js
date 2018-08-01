import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";

import history from "../../history";
import * as actions from "../../actions";

import EncounterForm from "./form";

class NewEncounter extends Component {

  success = (id) => {
    this.props.setLoading(false);
    this.props.getEncounter(id, () => history.push("/encounters/"+id), (e) => console.log(e));
  }

  render(){
    return(
      <EncounterForm success={(id) => this.success(id)} action={this.props.createEncounter} submitText="Create"/>
    );
  }
}

function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps, actions)(NewEncounter);
