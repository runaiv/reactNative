import React from 'react';
import { ActivityIndicator, Text, View ,Button,  selected, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
//mport { firebase } from '@react-native-firebase/auth';
//import auth from '@react-native-firebase/auth';

export default class Favorites extends React.Component {

  constructor(props){
    super(props);
    this.state = { isLoading: false}
  }

  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
        <View>
          <Text>hey</Text>
          <Button style= {{flexDirection: 'row-reverse', position: 'Add to favorites'}} 
            title="Login page"
            onPress={() => this.props.navigation.navigate('Login')}
          />
          <Button style= {{flexDirection: 'row-reverse', position: 'Add to favorites'}} 
            title="Signup page"
            onPress={() => this.props.navigation.navigate('Signup')}
          />
        </View>
          
    );
  }
} 
const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 32,
  },
});