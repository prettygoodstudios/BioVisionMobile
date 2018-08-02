import React, {Component} from "react";
import {View, Text, DatePickerIOS, Picker} from "react-native";
import {connect} from "react-redux";

import history from "../../history";
import * as actions from "../../actions";
import baseStyles from "../../styles/main";
import dateStyles from "../../styles/date";
import formStyles from "../../styles/formStyles";

import CollectionCard from "../widgets/collectionCard";
import Error from "../widgets/error";

class EncounterFilter extends Component {
  constructor(){
    super();
    this.state = {
      start: new Date(),
      end: new Date(),
      error: "",
      specie: -1
    }
  }

  componentDidMount(){
    this.getDate({s: undefined, e: undefined});
    this.props.allSpecies(() => console.log("Got the species"), (e) => console.log(e));
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
    const {specie , start, end, error} = this.state;
    let specieArray = [{common: "All Species", id: -1}].concat(this.props.species);
    let filtered = specie != -1 ? this.props.encounters.filter((s) => { return s.id == specie}) : this.props.encounters;
    return(
      <View>
        <Text style={baseStyles.h1}>Filter Encounters</Text>
        <Text style={baseStyles.h1}>By Date</Text>
        <Text style={baseStyles.p}>Start</Text>
        <DatePickerIOS date={start} onDateChange={ date => this.setDate(true, date)} mode="date"/>
        <Text style={baseStyles.p}>End</Text>
        <DatePickerIOS date={end} onDateChange={ date => this.setDate(false, date)} mode="date"/>
        <Error error={error} />
        <Text style={baseStyles.h1}>By Specie</Text>
        <Text>Select a specie.</Text>
        <Picker
          prompt="Pick a specie!"
          style={[formStyles.picker]}
          itemStyle={[formStyles.pickerItem]}
          selectedValue={this.state.specie}
          onValueChange={(itemValue, itemIndex) => this.setState({ specie: itemValue})}>
          { specieArray.map((s, i) => {
            return(
              <Picker.Item label={s.common} value={s.id} key={i} />
            );
          })}
        </Picker>
        <CollectionCard title="Encounters" itemTitle="date" description="description" select={this.goToEncounter} items={this.props.encounters != undefined ? filtered : []} />
      </View>
    );
  }
}

function mapStateToProps(state){
  return{
    encounters: state.encounters.encounters,
    species: state.species.species
  }
}

export default connect(mapStateToProps, actions)(EncounterFilter);
