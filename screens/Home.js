import React from 'react';
import { FlatList, ActivityIndicator, Text, View , selected, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';


export default class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = { isLoading: true}
  }

  componentDidMount(){
    return fetch('https://pokeapi.co/api/v2/pokemon/')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.results,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  async getImage(url){
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson.sprites.front_default
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
      <View style={{flex: 1, paddingTop:20, }}>
        <FlatList style={{ }}
          data={this.state.dataSource}
          renderItem=
          {({item}) => 
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Details', {...item})}
          style={[
            styles.item,
          ]}
        >
          <Text style={styles.title}>{item.name}</Text>
          <Image
          style={{width: 50, height: 50}}
          source={''}
          //this.getImage(item.url)
          />
        </TouchableOpacity>
          }
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