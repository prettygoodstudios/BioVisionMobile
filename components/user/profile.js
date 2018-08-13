import React, {Component} from "react";
import {View, Text, AsyncStorage} from "react-native";
import {connect} from "react-redux";

import history, {goBack} from "../../history";
import * as actions from "../../actions";
import baseStyles from "../../styles/main";
import {USER} from "../../storage";

import Button from "../widgets/button";
import CollectionCard from "../widgets/collectionCard";
import Error from "../widgets/error";

class UserProfile extends Component {
  constructor(){
    super();
    this.state = {
      error: ""
    }
  }

  componentDidMount(){
    if(this.props.user.email != "guest_user"){
      this.props.setLoading(true);
      this.props.getUserEncounters(this.props.user.id, () => this.success(), (e) => this.error(e));
    }
  }
  error = (e) => {
    this.props.setLoading(false);
    this.setState({
      error: "Could not establish a connection with the server."
    });
  }

  success = () => {
    this.props.setLoading(false);
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

  updateLocalEncounters = (rows) => {
    this.props.setLoading(false);
    console.log("My rows", rows);
  }

  render(){
    return(
      <View>
        { this.props.user.email != "guest_user" ?
          <View>
            <Text style={[baseStyles.h1]}>{this.props.user.display}</Text>
            <Text>{this.props.user.email}</Text>
            <Button content="Logout" onPress={ this.logOut }/>
            <Button content="Back" onPress={ goBack }/>
            <Button content="Update Local Encounters" onPress={ () => this.props.updateLocalEncounters(this.props.encounters, this.updateLocalEncounters)} />
            <Error error={this.state.error}/>
            <CollectionCard title="Encounters" itemTitle="date" description="description" select={this.goToEncounter} items={this.props.encounters} />
          </View>
          :
          <View>
            <Button content="Login" onPress={ () => this.props.logOut(this.clearData) }/>
            <Button content="Sign Up" onPress={ () => this.props.logOut(() => history.push("/signup")) }/>
          </View>
        }
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
