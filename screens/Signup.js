import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';

import firebase from 'firebase';

export default class Signup extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
      }
      
      addUser(username, password){
        if(username != '' && password != '')
            {
                firebase.auth().createUserWithEmailAndPassword(username, password).then(alert('success')).catch(function(error) {
                alert(error)
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
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
                    Signup
                </Text>
                <TextInput
                    placeholder="email ID"
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                />
                <TextInput
                    style={{height: 40}}
                    placeholder="eype here to translate!"
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                />
                <View style={{margin:7}} />
                <Button 
                          onPress={() => this.addUser(this.state.username, this.state.password)}
                          title="Submit"
                      />
                  </ScrollView>
            )
    }
}