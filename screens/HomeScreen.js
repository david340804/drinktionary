import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList
} from 'react-native';

import autobind from 'autobind-decorator'
import SearchBar from 'react-native-searchbar'
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { IngredientsList, IngredientsListItem } from '../components/IngredientsList';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      results: '',
    }
  }

  componentDidMount(){
    this.fetchData();
  }

  @autobind
  fetchData(){
    try{
      //fetch the list of ingredients
      fetch('http://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
        .then((response) => {
          try{   
            r = response.json();
            return r;
          }catch(e){
            console.log(e);
          }
        })
        .then((responseJson) => {
          try{
            this.addIngredientsData(responseJson.drinks);
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

  @autobind
  addIngredientsData(_data){
    _ingredients = [];
    _data.forEach(
      (ingredient) => {
        //add to array of ingredient names
        _ingredients.push(ingredient.strIngredient1);
      }
    );
    this.setState({
      ingredients: _ingredients,
    });
  }
  
  @autobind
  _handleResults(results) {
    this.setState({ results });
  }

  render() {
    return (
      <View style={styles.searchBar}>
        <SearchBar
          ref={(ref) => this.searchBar = ref}
          data={this.state.ingredients}
          handleResults={this._handleResults}
          showOnLoad={true}
          backCloseSize={0}
          hideBack={true}
          placeholder={'Search for Ingredients'}
          heightAdjust={0}
        />
        <View style={{height: 300, marginTop: 70}}>
          <IngredientsList
            data={this.state.results}/>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 20,
  },
  ingredientInput: {
    height: 35,
    margin: 10,
  },
  searchBar: {
    padding: 0,
    paddingTop: 0,
  },
  titleText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  
});
