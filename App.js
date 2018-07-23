import React from 'react';
import {Text, View, ScrollView } from 'react-native';
import { MemoryRouter, Route, Link, Switch } from 'react-router-native';
import { Provider } from 'react-redux';
import reduxThunk from "redux-thunk";
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';

const logger = createLogger();

import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(logger, reduxThunk));

import LoginForm from "./components/login/form";
import LocationsIndex from "./components/locations/locationsIndex";
import LocationsShow from "./components/locations/locationsShow";
import Nav from "./components/layout/nav";

import styles from "./styles/main";
import history from "./history";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Nav title="BioVision"/>
          <ScrollView style={styles.body}>
            <MemoryRouter>
              <Switch>
                <Route exact path="/" component={LoginForm}/>
                <Route exact path="/locations" component={LocationsIndex}/>
                <Route path="/locations/:id" component={LocationsShow} />
              </Switch>
            </MemoryRouter>
          </ScrollView>
        </View>
      </Provider>
    );
  }
}
