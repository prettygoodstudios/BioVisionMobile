import React from 'react';
import {Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import {Font} from 'expo';
import { NativeRouter, Route, Link, Switch } from 'react-router-native';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import reduxThunk from "redux-thunk";
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';


const logger = createLogger();

import reducers from './reducers';

import history from "./history";
const store = createStore(reducers, applyMiddleware(logger, reduxThunk, routerMiddleware(history)));

import LocationsIndex from "./components/locations/locationsIndex";
import LocationsShow from "./components/locations/locationsShow";

import UserProfile from "./components/user/profile";
import LoginForm from "./components/login/form";
import SignupForm from "./components/signup/form";

import Nav from "./components/layout/nav";
import Options from "./components/layout/options";
import Spinner from "./components/widgets/spinner";

import NewEncounter from "./components/encounters/new";
import EditEncounter from "./components/encounters/edit";
import EncounterShow from "./components/encounters/show";
import EncounterFilter from "./components/encounters/filter";

import styles from "./styles/main";


export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      fontsLoaded: false,
      keyBoard: false
    }
  }

  async componentDidMount(){
    await Font.loadAsync({
      'avenir-medium': require('./assets/fonts/avenirmedium.ttf'),
    });
    await Font.loadAsync({
      'futura-medium': require('./assets/fonts/futuramedium.ttf'),
    });
    this.setState({
      fontsLoaded: true
    })
  }

  render() {
    if(!this.state.fontsLoaded){
      return <View></View>;
    }
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Nav title="BioVision"/>
          <ScrollView style={styles.body} keyboardShouldPersistTaps='always'>
            <KeyboardAvoidingView  behavior="padding" style={{flex: 1}} enabled>
              <ConnectedRouter history={history}>
                <Switch>
                  <Route exact path="/" component={LoginForm}/>
                  <Route exact path="/signup" component={SignupForm}/>
                  <Route exact path="/locations" component={LocationsIndex}/>
                  <Route path="/locations/:id" component={LocationsShow} />
                  <Route path="/user/profile" component={UserProfile} />
                  <Route path="/encounters/new" component={NewEncounter} />
                  <Route exact path="/encounters/:id" component={EncounterShow} />
                  <Route path="/encounters/filter/:id" component={EncounterFilter} />
                  <Route path="/encounters/edit/:id" component={EditEncounter} />
                </Switch>
              </ConnectedRouter>
              <View style={styles.bottomMargin}></View>
              <View style={{height: this.state.keyBoard ? 300 : 0}}></View>
            </KeyboardAvoidingView>
          </ScrollView>
          <Spinner />
          <Options />
        </View>
      </Provider>
    );
  }
}
