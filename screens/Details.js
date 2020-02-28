import React from 'react';
import { FlatList, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, Text, View , Button, Alert } from 'react-native';


export default class Details extends React.Component {

  constructor(props){
    super(props);
    this.state = { isLoading: true}
  }

  componentDidMount(){ 
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
  
  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
    <SafeAreaView style={styles.container}>
        <Button style= {{flexDirection: 'row-reverse'}} 
          title="Add to favorites"
          onPress={() => this.props.navigation.navigate('Favorites')}
        />
        <ScrollView>
        <View style={styles.child}> 
                <Text style={styles.title}>weight</Text>
                <Text style={styles.value}>{this.state.dataSource.weight}</Text>
        </View>
        <View style={styles.child}>
                <Text style={styles.title}>index name</Text>
                {this.state.dataSource.moves.map(data => 
                     <Text style={styles.value}>{data.move.name}</Text>
                )}
        </View>
        </ScrollView>
      </SafeAreaView>
      
    );
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
  