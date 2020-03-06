import React from 'react';
import { ActivityIndicator, Text, View ,Button,  selected, TouchableOpacity, Image, Alert, StyleSheet,  } from 'react-native';
//mport { firebase } from '@react-native-firebase/auth';
//import auth from '@react-native-firebase/auth';
import {AsyncStorage} from 'react-native';



export default class Favorites extends React.Component {

  constructor(props){
    super(props);
    this.state = { isLoading: false}
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount(){ 
    this._retrieveData()
  }
  

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('UID');
      if (value !== null) {
        // We have data!!
        this.setState({isLoggedIn : true})
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  render(){
    if(!this.state.isLoggedIn){
      return(
        <View>
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
    else
    {
      return(
        <View>
           <Button style= {{flexDirection: 'row-reverse', position: 'Add to favorites'}} 
            title="Back to list"
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
      )
    }
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