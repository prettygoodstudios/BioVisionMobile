import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from "../../history";

import EncounterForm from "./form";

class EditEncounter extends Component {

  success = (id) => {
    this.props.setLoading(false);
    this.props.getEncounter(id, () => history.push("/encounters/"+id), (e) => console.log(e));
  }

  render() {
    return(
      <View>
        <EncounterForm success={this.success} action={this.props.updateEncounter} encounter={this.props} submitText="Update"/>
      </View>
    );
  }
}
function mapStateToProps(state){
  return{
    ...state.encounters.encounter,
    specie: state.encounters.encounter.specie_id
  }
}

export default connect(mapStateToProps, actions)(EditEncounter);
