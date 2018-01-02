import React from 'react';
import autobind from 'autobind-decorator'
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

export class IngredientsList extends React.PureComponent {
  state = {
    
  };

  _keyExtractor = (item, index) => index;

  _onPressItem = (pair) => {
    this.props.onPressItem(pair);
  };

  _renderItem = ({item}) => (
    <IngredientsListItem
      props={item}
      ingredientName={item}
      onPressItem={this._onPressItem}
    />
  );

  render() {
    console.log(this.props.data);
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

class IngredientsListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.item);
  };

  render() {
    console.log(this.props.ingredientName)
    return (
      <TouchableOpacity
      onPress={this._onPress}>
        <View style={{ backgroundColor: 'white', marginTop: 5, marginBottom: 5, marginLeft: 10, marginRight: 10, padding: 10,}}>
          <Text style={{fontFamily: 'System', fontSize: 20}}>{this.props.ingredientName}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}