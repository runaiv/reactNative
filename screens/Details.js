import React from 'react';
import { FlatList, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, Text, View , Button, Alert } from 'react-native';
import {AsyncStorage} from 'react-native';
import firebase from 'firebase';


export default class Details extends React.Component {

  constructor(props){
    super(props);
    var database = firebase.database();
    this.state = { 
      isLoading: true,
      isLoggedIn: false,
      userId: null
    }
  }

  componentDidMount(){ 
    this._retrieveData()

    const {route} = this.props;
    const {url} = route.params;
    return fetch(url)
    
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });
      })
      .catch((error) =>{
        console.error(error);
      });
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
  }

  addTofav(){
    if(this.state.isLoggedIn){
      this.writeUserData() 
      alert('addded to favorites')
      this.props.navigation.navigate('Favorites')
    }
    else{
      this.props.navigation.navigate('Login')
    }   
    //this.writeUserData()
    //this.readUserData()
  }

  writeUserData() {
    this.readUserData()
    firebase.database().ref('users/' + this.state.userId).push({
      pokemonId : this.state.dataSource.id
    })
    
  }
  
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
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    else if(this.state.isLoggedIn){
    return (
    <SafeAreaView style={styles.container}>
        <Button style= {{flexDirection: 'row-reverse'}} 
          title="Add to favorites"
          onPress={() => this.addTofav()}
        />
        <ScrollView>
          <View style={styles.child}> 
                <Text style={styles.title}>weight</Text>
                <Text style={styles.value}>{this.state.dataSource.weight}</Text>
                <Text style={styles.title}>index name</Text>
                {this.state.dataSource.moves.map(data => 
                     <Text style={styles.value}>{data.move.name}</Text>
                )}
          </View>
        </ScrollView>
      </SafeAreaView>
      )
    }
    else {
      return(
        
        <Text>Nothing to show</Text>
      )
    }
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    child: {
      flex: 1,
      alignItems: "center"
    },
    title: {
        fontSize: 30
    },
    value: {
        fontSize: 25
    }
  });
  