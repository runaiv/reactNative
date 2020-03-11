import React from 'react';
import { ActivityIndicator, Text, View ,Button,  selected, TouchableOpacity, Image, Alert, StyleSheet, ScrollView } from 'react-native';
//mport { firebase } from '@react-native-firebase/auth';
//import auth from '@react-native-firebase/auth';
import {AsyncStorage} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default class Favorites extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
      isLoading: false,
      userId: null,
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
        this.setState({isLoggedIn : true,
          userId: value})
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  
  readUserData(){
    firebase.database().ref('/users/' + this.state.userId).on('value', this.gotData, this.errData)
  }
  
  gotData(data){
    let pokemons = data.val() 
    let keys = Object.keys(pokemons)
    let ids = []
    for(var i=0; i < keys.length; i++){
      let k = keys[i]
      ids.push(pokemons[k].pokemonId)
    }
    let idsOfPokemon = Array.from(new Set(ids))
    return idsOfPokemon
  }

  errData(err){
    console.log(err)
  }


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
        <SafeAreaView>
          <ScrollView>
            <Text>Nothing to show</Text>
          </ScrollView>
        </SafeAreaView>
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