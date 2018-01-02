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
      allIngredients: [],
      results: [],
      selectedIngredients: [],
      refresh: false,
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
      allIngredients: _ingredients,
    });
  }
  
  @autobind
  _handleResults(results) {
    this.setState({ results });
  }

  @autobind
  addIngredientToSearch(_ingredient){
    var _newSelected = [];

    //if this ingredient is already added to the search, skip adding it again
    if(this.state.selectedIngredients.indexOf(_ingredient) != -1){
      return;
    }

    console.log('adding to selected: ')
    console.log(_ingredient);

    //determine the new search terms
    if(this.state.selectedIngredients.length > 0){
      //appent to the old array if it exists
      _newSelected = this.state.selectedIngredients.concat([_ingredient]);
    }else{
      //create the array for the first search term
      _newSelected = [_ingredient];
    }

    console.log(_newSelected);
    
    this.setState({
      selectedIngredients: _newSelected,
    },() => {
    });
  }

  @autobind
  removeIngredientFromSearch(_ingredient){
    _s = this.state.selectedIngredients;

    //remove all the entries of _ingredient from the search terms array
    for (var i=_s.length-1; i>=0; i--) {
      if (_s[i] === _ingredient) {
          _s.splice(i, 1);
      }
    }

    this.setState({
      selectedIngredients: _s,
      refresh: !this.state.refresh,
    },() => {
      console.log(this.state.selectedIngredients);
    });
    
  }

  render() {
    return (
      <View style={styles.searchBar,{flex: 1,}}>
        <SearchBar
          ref={(ref) => this.searchBar = ref}
          data={this.state.allIngredients}
          handleResults={this._handleResults}
          showOnLoad={true}
          backCloseSize={0}
          hideBack={true}
          placeholder={'Search for Ingredients'}
          heightAdjust={0}
        />
        <View style={{flex: 1, marginTop: 70}}>
          <IngredientsList
            data={this.state.selectedIngredients}
            extraData={this.state.refresh}
            onPressItem={this.removeIngredientFromSearch}
            itemViewStyle={styles.selectedIngredientsView}
            itemTextStyle={styles.selectedIngredientsText}
            itemIcon={' '}
          />
          <IngredientsList
            data={this.state.results}
            onPressItem={this.addIngredientToSearch}
            itemViewStyle={styles.ingredientsView}
            itemTextStyle={styles.ingredientsText}
            itemIcon={' '}
          />
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
  selectedIngredientsView: {
    backgroundColor: 'black',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  selectedIngredientsText: {
    fontFamily: 'System',
    fontSize: 20,
    color: 'white',
  },
  ingredientsView: {
    backgroundColor: 'white',
    marginTop: 5 ,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  ingredientsText: {
    fontFamily: 'System',
    fontSize: 20
  },
});
