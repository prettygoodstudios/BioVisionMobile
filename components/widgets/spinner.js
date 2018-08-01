import React, {Component} from "react";
import {Text, View, Animated, Easing} from "react-native";
import {Icon} from "react-native-elements";
import {connect} from "react-redux";

import styles from "../../styles/spinner";


class Spinner extends Component {

  constructor(){
      super();
      this.state = {
        spinValue: new Animated.Value(0)
      }
  }
  componentDidMount(){
    Animated.timing(                  // Animate over time
      this.state.spinValue,            // The animated value to drive
      {
        toValue: 360,                   // Animate to opacity: 1 (opaque)
        duration: 2000,
        easing: Easing.linear              // Make it take a while
      }
    ).start();
  }

  render(){
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg']
    });
    if(!this.props.loading){
      return <View></View>;
    }
    return(
      <View style={styles.spinnerMask}>
        <View style={styles.spinner}>
          <Animated.View  style={{transform: [{rotate: spin}] }}>
            <Icon name="cached" iconStyle={styles.spinnerIcon} />
          </Animated.View >
        </View>
      </View>
    );
  }
}

function mapStateToProps(state){
  return{
    ...state.loading
  }
}

export default connect(mapStateToProps, null)(Spinner);
