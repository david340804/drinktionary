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
} from 'react-native';


import autobind from 'autobind-decorator'
import SearchBar from 'react-native-searchbar'
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';

const ingredients = ['rum', 'vodka', 'gin', 'badness', 'pisco', 'whiskey'];

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      ingredient: '',
      results: '',
    }
  }
  
  @autobind
  _handleResults(results) {
    console.log(results);
    this.setState({ results });
  }

  render() {
    return (
      <View style={styles.searchBar}>
        <Text style={styles.titleText}>
          Drinktionary
        </Text>
        <SearchBar
          ref={(ref) => this.searchBar = ref}
          data={ingredients}
          handleResults={this._handleResults}
          showOnLoad={true}
          backCloseSize={0}
          hideBack={true}
        />
        <Text>
          {this.state.results}
        </Text>
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
