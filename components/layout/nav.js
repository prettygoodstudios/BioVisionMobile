import React, {Component} from "react";
import {Text, View, Image} from "react-native";
import {connect} from "react-redux";

import styles from "../../styles/navStyles";

class Nav extends Component {
  constructor(){
    super();
    this.state = {
      showMenu: false
    }
  }
  render() {
    const {title} = this.props;
    return(
      <View style={[styles.nav]}>
        <Text style={[styles.title]}>{title}</Text>
        <Menu user={this.props.user} />
      </View>
    );
  }
}

const Menu = (props) => {
  if (props.user.authenticated){
    return <View style={[styles.menu]}><Image source={{ uri :"https://image.flaticon.com/icons/png/512/36/36950.png" }} style={[styles.menuImage]}/></View>;
  }else{
    return <View></View>;
  }
}

function mapStateToProps(state){
  const {user} = state.auth;
  console.log("Navuser",state);
  return{
    user: user
  }
}

export default connect(mapStateToProps,null)(Nav);
