import React, {Component} from "react";
import {View, Text, DatePickerIOS, Picker, Switch} from "react-native";
import {connect} from "react-redux";

import history from "../../history";
import * as actions from "../../actions";
import baseStyles from "../../styles/main";
import dateStyles from "../../styles/date";
import formStyles from "../../styles/formStyles";

import CollectionCard from "../widgets/collectionCard";
import Error from "../widgets/error";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class EncounterFilter extends Component {
  constructor(){
    super();
    this.state = {
      start: new Date(),
      end: new Date(),
      isMonth: false,
      startMonth: -1,
      endMonth: -1,
      error: "",
      specie: -1,
      state: "All States"
    }
  }

  componentDidMount(){
    this.getDate({s: undefined, e: undefined});
    this.props.allSpecies(() => console.log("Got the species!"), (e) => console.log(e));
    this.props.getStates(() => console.log("Got the states!"), (e) => console.log(e));
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

  getMonth = ({s, e}) => {
    this.props.setLoading(true);
    const start = s ? s : this.state.startMonth;
    const end = e ? e : this.state.endMonth;
    const params = {
      start: start+1,
      end: end+1
    }
    if(params.end == 0){
      params.end++;
    }
    if(params.start == 0){
      params.start++;
    }
    this.props.getMonthEncounters(params, this.success, this.error);
  }

  success = () => {
    this.props.setLoading(false);
  }

  error = (e) => {
    this.props.setLoading(false);
    console.log(e);
  }

  setMonth = (start, date) => {
    if(start && date <= this.state.endMonth){
      this.setState({
        startMonth: date,
        error: ""
      });
      this.getMonth({s: date, e: undefined});
    }else if(!start && date >= this.state.startMonth){
      this.setState({
        endMonth: date,
        error: ""
      });
      this.getMonth({e: date, s: undefined});
    }else{
      this.setState({
        startMonth: this.state.startMonth,
        endMonth: this.state.endMonth,
        error: "The start month must become before or equal the end month."
      });
    }
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
        error: "The start date must become before or equal the end date."
      });
    }
  }

  toggleDate = (month) => {
    this.setState({isMonth: month});
    if(month){
      this.getMonth({s: this.state.startMonth, e: this.state.endMonth});
    }else{
      this.getDate({s: this.state.start, e: this.state.end});
    }
  }

  goToEncounter = (id) => {
    this.props.getEncounter(id, () => history.push("/encounters/"+id),(e) => console.log(e));
  }

  render(){
    const {specie , start, end, error, state} = this.state;
    const specieArray = [{common: "All Species", id: -1}].concat(this.props.species);
    const stateArray = ["All States"].concat(this.props.states);
    let filtered = specie != -1 ? this.props.encounters.filter((e) => { return e.specie_id == specie}) : this.props.encounters;
    filtered = state != "All States" ? filtered.filter((e) => { return e.state == state }) : filtered;
    filtered.map((f) => {
      return{
        ...f,
        full_address: `${f.address ? f.address+", " : ""}${f.city}, ${f.state}, ${f.country}`
      }
    });
    return(
      <View>
        <Text style={baseStyles.h1}>Filter Encounters</Text>
        <Text style={baseStyles.h1}>By Date</Text>
        <Text>or by month range.</Text>
        <Switch onValueChange={(v) => this.toggleDate(v)} value={this.state.isMonth}/>
        { !this.state.isMonth &&
          <View>
            <Text style={baseStyles.p}>Start</Text>
            <DatePickerIOS date={start} onDateChange={ date => this.setDate(true, date)} mode="date"/>
            <Text style={baseStyles.p}>End</Text>
            <DatePickerIOS date={end} onDateChange={ date => this.setDate(false, date)} mode="date"/>
          </View>
        }
        { this.state.isMonth &&
          <View>
            <Text style={baseStyles.p}>Start Month</Text>
            <Picker prompt="Pick a month!"
              style={[formStyles.picker]}
              itemStyle={[formStyles.pickerItem]}
              selectedValue={this.state.startMonth}
              onValueChange={(itemValue, itemIndex) => this.setMonth(true, itemValue)}>
              {months.map((m, i) => {
                return(
                  <Picker.Item label={m} value={i} key={i} />
                );
              })}
            </Picker>
            <Text style={baseStyles.p}>End Month</Text>
            <Picker prompt="Pick a month!"
              style={[formStyles.picker]}
              itemStyle={[formStyles.pickerItem]}
              selectedValue={this.state.endMonth}
              onValueChange={(itemValue, itemIndex) => this.setMonth(false, itemValue)}>
              {months.map((m, i) => {
                return(
                  <Picker.Item label={m} value={i} key={i} />
                );
              })}
            </Picker>
          </View>
        }
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
        <Text style={baseStyles.h1}>By State</Text>
        <Text>Select a state.</Text>
        <Picker
          prompt="Pick a state!"
          style={[formStyles.picker]}
          itemStyle={[formStyles.pickerItem]}
          selectedValue={this.state.state}
          onValueChange={(itemValue, itemIndex) => this.setState({ state: itemValue})}>
          { stateArray.map((s, i) => {
            return(
              <Picker.Item label={s} value={s} key={i} />
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
    species: state.species.species,
    states: state.locations.states
  }
}

export default connect(mapStateToProps, actions)(EncounterFilter);
