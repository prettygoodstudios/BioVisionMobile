import React from 'react';
import {Text, View, ScrollView } from 'react-native';
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

import LoginForm from "./components/login/form";
import LocationsIndex from "./components/locations/locationsIndex";
import LocationsShow from "./components/locations/locationsShow";
import UserProfile from "./components/user/profile";
import Nav from "./components/layout/nav";
import Options from "./components/layout/options";
import NewEncounter from "./components/encounters/new";

import styles from "./styles/main";


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Nav title="BioVision"/>
          <ScrollView style={styles.body}>
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact path="/" component={LoginForm}/>
                <Route exact path="/locations" component={LocationsIndex}/>
                <Route path="/locations/:id" component={LocationsShow} />
                <Route path="/user/profile" component={UserProfile} />
                <Route path="/encounters/new" component={NewEncounter} />
              </Switch>
            </ConnectedRouter>
            <View style={styles.bottomMargin}></View>
          </ScrollView>
          <Options />
        </View>
      </Provider>
    );
  }
}
