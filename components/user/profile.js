import React, {Component} from "react";
import {View, Text, AsyncStorage} from "react-native";
import {connect} from "react-redux";

import history, {goBack} from "../../history";
import * as actions from "../../actions";
import baseStyles from "../../styles/main";
import {USER} from "../../storage";

import Button from "../widgets/button";
import CollectionCard from "../widgets/collectionCard";

class UserProfile extends Component {

  componentDidMount(){
    this.props.getUserEncounters(this.props.user.id, () => console.log("Got User!"), (e) => console.log(e));
  }

  logOut = () => {
    this.props.logOut(this.clearData);
  }

  clearData = async () => {
    history.push("/");
    AsyncStorage.removeItem(USER);
  }

  goToEncounter = (id) => {
    this.props.getEncounter(id, () => history.push("/encounters/"+id),() => console.log(e));
  }

  render(){
    return(
      <View>
        <Text style={[baseStyles.h1]}>Profile</Text>
        <Text>{this.props.user.email}</Text>
        <Button content="Logout" onPress={ this.logOut }/>
        <Button content="Back" onPress={ goBack }/>
        <CollectionCard title="Encounters" itemTitle="date" description="description" select={this.goToEncounter} items={this.props.encounters} />
      </View>
    );
  }
}

function mapStateToProps(state){
  const {user} = state.auth;
  const {encounters} = state.encounters;
  return{
    user,
    encounters
  }
}


export default connect(mapStateToProps, actions)(UserProfile);
