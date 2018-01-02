import React from 'react';
import autobind from 'autobind-decorator';
import { DrinkList, DrinkListItem } from '../components/DrinkList';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import Colors from '../constants/Colors';

export default class BrowseDrinkScreen extends React.Component {
  static navigationOptions = {
    title: 'Browse Drinks',
  };

  constructor(props){
    super(props);
      this.state = {
        drinks: [],
      };
  }

  componentDidMount(){
    this.fetchData();
  }

  @autobind
  fetchData(){
    try{
      fetch('http://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
        .then((response) => {
          try{   
            r = response.json();
            return r;
          }catch(e){
            console.log(e);
          }
        })
        .then((responseJson) => {
          console.log(responseJson);
          try{
            this.addDrinkData(responseJson.drinks);
          }catch(e){
            console.log(e);
          }
          
        })
        .catch((error) => {
          console.error(error);
        }
      );   
    } catch(e){
      console.log('Error parsing JSON for drink list data');
    }
  }

  addDrinkData(_data){
    this.setState({
      drinks: _data,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <DrinkList
          data={this.state.drinks}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: Colors.background,
  },
});
