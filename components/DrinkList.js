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
import Colors from '../constants/Colors';

export class DrinkList extends React.PureComponent {
  state = {
    
  };

  _keyExtractor = (item, index) => item.idDrink;

  _onPressItem = (pair) => {
    this.props.onPressItem(pair);
  };

  _onLongPressItem = (pair) => {
    this.props.onLongPressItem(pair);
  };

  _renderItem = ({item}) => (
    <DrinkListItem
      props={item}
      item={item}
      onPressItem={this._onPressItem}
      onLongPressItem={this._onLongPressItem}
    />
  );

  render() {
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

class DrinkListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.item);
  };

  _onLongPress = () => {
    this.props.onLongPressItem(this.props.item);
  };

  render() {
    return (
      <TouchableOpacity
      onPress={this._onPress}
      onLongPress={this._onLongPress}>
        <View style={{backgroundColor: 'white', height: 40, padding: 10, borderRadius: 5, margin: 10}}>
          <Text style={{fontFamily: 'System'}}>
            {this.props.item.strDrink}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}