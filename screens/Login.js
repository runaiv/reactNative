import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';
import {AsyncStorage} from 'react-native';
import firebase from 'firebase';

export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
      }

      _storeData = async (id) => {
        try {
          await AsyncStorage.setItem('UID', id);
        }catch (error) {
          // Error saving data
        }
      };

      loginUser(username, password){
        if(username != '' && password != ''){
                firebase.auth().signInWithEmailAndPassword(username, password)
                
                .then(data => this._storeData(data.user.uid), this.props.navigation.navigate('Favorites'))
                .catch(function(error) {
                    alert(error)
                    // Handle Errors here
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage)
                    // ...
                    
                }); 
        }     else
        {
         alert('username or password is invalid')
        }
    }
    
    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27}}>
                    Login
                </Text>
                <TextInput
                    placeholder="email ID"
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                />
                <TextInput
                    style={{height: 40}}
                    placeholder="Password"
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                />
                <View style={{margin:7}} />
                <Button 
                          onPress={() => this.loginUser(this.state.username, this.state.password)}
                          title="Submit"
                      />
                  </ScrollView>
            )
    }
}