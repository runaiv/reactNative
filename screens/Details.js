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
    this.writeUserData()
    this.readUserData()
  }

  writeUserData() {
    firebase.database().ref('users/' + this.state.userId).set({
      Pokemon : this.state.dataSource.weight
    })
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
      
    )}
    else{
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
  