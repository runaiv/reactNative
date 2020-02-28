import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Details from './screens/Details';
import Favorites from './screens/Favorites';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Firebase from "./Firebase";


 
const Stack = createStackNavigator();

export default class App extends React.Component{

  constructor(props){
    super(props);
    Firebase();
  }

  render(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home" 
          component={Home}
          options={{ title: 'List of Pokemons', headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }}}
         />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{ title: 'Info', headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          } }}
        />
         <Stack.Screen
          name="Favorites"
          component={Favorites}
          options={{ title: 'Liste de favs', headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          } }}
        />
         <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Page de connexion', headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          } }}
        />
         <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ title: 'Page de Signup', headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          } }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}