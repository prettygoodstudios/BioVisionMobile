import React, {Component} from "react";
import {View, Text, DatePickerIOS, Picker, Switch} from "react-native";
import {connect} from "react-redux";

import history from "../../history";
import * as actions from "../../actions";
import {safeTitle, fullAddress} from "../../helpers/locations";
import baseStyles from "../../styles/main";
import dateStyles from "../../styles/date";
import formStyles from "../../styles/formStyles";

import FilterNav from "../widgets/filterNav";
import TabView from "../widgets/tabView";
import CollectionCard from "../widgets/collectionCard";
import Error from "../widgets/error";
import DatePickerCrossPlatform from "../widgets/datePickerCrossPlatform";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const DateFilter = ({isMonth, startMonth, endMonth, start, end, setMonth, setDate, toggleDate}) => {
  return(
    <View>
      <Text style={baseStyles.h1}>By Date</Text>
      <Text>or by month range.</Text>
      <Switch onValueChange={(v) => toggleDate(v)} value={isMonth}/>
      { !isMonth &&
        <View>
          <Text style={baseStyles.p}>Start</Text>
          <DatePickerCrossPlatform date={start} setDate={(d) => setDate(true, d)}/>
          <Text style={baseStyles.p}>End</Text>
          <DatePickerCrossPlatform date={end} setDate={(d) => setDate(false, d)}/>
        </View>
      }
      { isMonth &&
        <View>
          <Text style={baseStyles.p}>Start Month</Text>
          <Picker prompt="Pick a month!"
            style={[formStyles.picker]}
            itemStyle={[formStyles.pickerItem]}
            selectedValue={startMonth}
            onValueChange={(itemValue, itemIndex) => setMonth(true, itemValue)}>
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
            selectedValue={endMonth}
            onValueChange={(itemValue, itemIndex) => setMonth(false, itemValue)}>
            {months.map((m, i) => {
              return(
                <Picker.Item label={m} value={i} key={i} />
              );
            })}
          </Picker>
        </View>
      }
    </View>
  );
}

const SpecieFilter = ({specie, setSpecie, specieArray}) => {
  return(
    <View>
      <Text style={baseStyles.h1}>By Specie</Text>
      <Text>Select a specie.</Text>
      <Picker
        prompt="Pick a specie!"
        style={[formStyles.picker]}
        itemStyle={[formStyles.pickerItem]}
        selectedValue={specie}
        onValueChange={(itemValue, itemIndex) => setSpecie(itemValue)}>
        { specieArray.map((s, i) => {
          return(
            <Picker.Item label={s.common} value={s.id} key={i} />
          );
        })}
      </Picker>
    </View>
  );
}

const StateFilter = ({state, stateArray, setPlace}) => {
  return(
    <View>
      <Text style={baseStyles.h1}>By State</Text>
      <Text>Select a state.</Text>
      <Picker
        prompt="Pick a state!"
        style={[formStyles.picker]}
        itemStyle={[formStyles.pickerItem]}
        selectedValue={state}
        onValueChange={(itemValue, itemIndex) => setPlace(itemValue)}>
        { stateArray.map((s, i) => {
          return(
            <Picker.Item label={s} value={s} key={i} />
          );
        })}
      </Picker>
    </View>
  )
}


class EncounterFilter extends Component {
  constructor(){
    super();
    this.state = {
      start: new Date('01 Jan 1970 15:01:01 GMT'),
      end: new Date(),
      isMonth: false,
      startMonth: -1,
      endMonth: -1,
      error: "",
      specie: -1,
      state: "All States",
      selectedFilter: ""
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

  setSpecie = (id) => {
    this.setState({
      specie: id
    });
  }

  setPlace = (state) => {
    this.setState({
      state: state
    });
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
    this.setState({
      isMonth: month,
      error: ""
    });
    if(month){
      this.getMonth({s: this.state.startMonth, e: this.state.endMonth});
    }else{
      this.getDate({s: this.state.start, e: this.state.end});
    }
  }

  goToEncounter = (id) => {
    this.props.getEncounter(id, () => history.push("/encounters/"+id),(e) => console.log(e));
  }

  selectOption = (option) => {
    this.setState({
      selectedFilter: option
    })
  }

  render(){
    const options = [
      {
        icon: "today",
        callBack: this.selectOption
      },
      {
        icon: "business",
        callBack: this.selectOption
      },
      {
        icon: "nature",
        callBack: this.selectOption
      }
    ];
    const {specie , start, end, error, state, isMonth, startMonth, endMonth} = this.state;
    const specieArray = [{common: "All Species", id: -1}].concat(this.props.species);
    const stateArray = ["All States"].concat(this.props.states);
    let filtered = specie != -1 ? this.props.encounters.filter((e) => { return e.specie_id == specie}) : this.props.encounters;
    filtered = state != "All States" ? filtered.filter((e) => { return e.state == state }) : filtered;
    filtered.map((f) => {
      return{
        ...f,
        full_address: fullAddress(f),
        safeTitle: safeTitle(f)
      }
    });
    const navComponents = [
      {
        name: "today",
        component: DateFilter({start, end, isMonth, startMonth, endMonth, setDate: this.setDate, setMonth: this.setMonth, toggleDate: this.toggleDate})
      },
      {
        name: "business",
        component: StateFilter({state, stateArray, setPlace: this.setPlace})
      },
      {
        name: "nature",
        component: SpecieFilter({specie, specieArray, setSpecie: this.setSpecie})
      }
    ]
    return(
      <View>
        <Text style={baseStyles.h1}>Filter Encounters</Text>
        <FilterNav options={options}/>
        <TabView selectedTab={this.state.selectedFilter} tabs={navComponents}/>
        <Error error={error} />
        <CollectionCard title="Encounters" itemTitle="date" mapTitle={(e) => `${e.date} - ${safeTitle(e)}`} description="description" select={this.goToEncounter} items={this.props.encounters != undefined ? filtered : []} />
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
