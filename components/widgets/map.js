import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";
import {MapView} from "expo";
const {Marker, Callout} = MapView;

import history from "../../history";
import * as actions from "../../actions";

import styles from "../../styles/map";
import baseStyles from "../../styles/main";

import Button from "../widgets/button";

class Map extends Component {


  loadLocation = (id) => {
    this.props.getLocation(id , this.success, this.error);
  }

  success = (id) => {
    history.push("/locations/"+id);
  }

  error = () => {
    console.log("error");
  }

  render(){
    const {region, locations} = this.props;
    return (
      <MapView
        style={[styles.map]}
        region={region}
      >
        { locations.map((l, i) => {
          return (
            <Marker title={l.city} coordinate={{latitude: l.latitude, longitude: l.longitude}} key={i} image={{ uri: 'https://www.shareicon.net/download/2016/08/18/809136_tree_512x512.png' }} style={[styles.marker]}>
              <Callout>
                <View style={{backgroundColor: "white"}}>
                  <Text style={[baseStyles.h1]}>{l.city}</Text>
                  <Text>{l.full_address}</Text>
                  <Button content="View" onPress={() => this.loadLocation(l.id)}/>
                </View>
              </Callout>
            </Marker>
          );
        }) }
      </MapView>
    );
  }
}

export default connect(null, actions)(Map);
