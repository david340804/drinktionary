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

  _keyExtractor = (item, index) => index;

  _onPressItem = (_ingredientName) => {
    this.props.onPressItem(_ingredientName);
  };

  _renderItem = ({item}) => (
    <IngredientsListItem
      props={item}
      ingredientName={item}
      onPressItem={this._onPressItem}
      itemViewStyle={this.props.itemViewStyle}
      itemTextStyle={this.props.itemTextStyle}
      itemIcon={this.props.itemIcon}
    />
  );

  render() {
    //console.log(this.props.data);
    return (
      <FlatList
        data={this.props.data}
        extraData={this.props.extraData}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

class IngredientsListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.ingredientName);
  };

  render() {
    return (
      <TouchableOpacity
      onPress={this._onPress}>
        <View style={this.props.itemViewStyle}>
          <Text style={this.props.itemTextStyle}>{this.props.ingredientName}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}