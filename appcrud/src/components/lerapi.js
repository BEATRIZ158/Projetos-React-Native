import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import api from './src/services/api';
import Books from './books';

class LerApi extends Component {

  constructor(props){
    super(props);
    this.state = {
        books: [],
        loading: true
    };
  }

  async componentDidMount(){
    const response = await api.get('r-api/?api=filmes');
    this.setState({
        books: response.data,
        loading: false
    });
  }

  render() {

    if(this.state.loading){
      return(
        <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
          <ActivityIndicator color="#09A6FF" size={40}/>
        </View>
      )
    }else{
      return(
        <View style={styles.container}>
  
          <FlatList
          data={this.state.books}
          keyExtractor={item => item.id.toString() }
          renderItem={ ({item}) => <Books data={item} /> }
          />
  
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});

export default App;
