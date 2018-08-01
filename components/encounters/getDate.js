import React, {Component} from "react";
import {View, Text, DatePickerIOS} from "react-native";
import {connect} from "react-redux";

import history from "../../history";
import * as actions from "../../actions";
import baseStyles from "../../styles/main";
import dateStyles from "../../styles/date";

import CollectionCard from "../widgets/collectionCard";
import Error from "../widgets/error";

class EncounterGetDate extends Component {
  constructor(){
    super();
    this.state = {
      start: new Date(),
      end: new Date(),
      error: ""
    }
  }

  componentDidMount(){
    this.getDate({s: undefined, e: undefined});
  }

  getDate = ({s, e}) => {
    this.props.setLoading(true);
    const start = s ? s : this.state.start;
    const end = e ? e : this.state.end;
    const params = {
      start: `${start.getMonth()+1}-${start.getDate()}-${start.getFullYear()}`,
      end: `${end.getMonth()+1}-${end.getDate()}-${end.getFullYear()}`
    }
    this.props.getByDate(params, this.success, this.error);
  }
  success = () => {
    this.props.setLoading(false);
  }

  error = (e) => {
    this.props.setLoading(false);
    console.log(e);
  }

  setDate = (start, date) => {
    if(start && date <= this.state.end){
      this.setState({
        start: date,
        error: ""
      });
      this.getDate({s: date, e: undefined});
    }else if(!start && date >= this.state.start){
      this.setState({
        end: date,
        error: ""
      });
      this.getDate({e: date, s: undefined});
    }else{
      this.setState({
        start: this.state.start,
        end: this.state.end,
        error: "The start date must become before the end date."
      });
    }
  }

  goToEncounter = (id) => {
    this.props.getEncounter(id, () => history.push("/encounters/"+id),(e) => console.log(e));
  }

  render(){
    return(
      <View>
        <Text style={baseStyles.h1}>Get Encounters By Date Range</Text>
        <Text style={baseStyles.p}>Start</Text>
        <DatePickerIOS date={this.state.start} onDateChange={ date => this.setDate(true, date)} mode="date"/>
        <Text style={baseStyles.p}>End</Text>
        <DatePickerIOS date={this.state.end} onDateChange={ date => this.setDate(false, date)} mode="date"/>
        <Error error={this.state.error} />
        <CollectionCard title="Encounters" itemTitle="date" description="description" select={this.goToEncounter} items={this.props.encounters != undefined ? this.props.encounters : []} />
      </View>
    );
  }
}

function mapStateToProps(state){
  return{
    encounters: state.encounters.encounters
  }
}

export default connect(mapStateToProps, actions)(EncounterGetDate);
