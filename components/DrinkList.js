import { React } from 'react';
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
} from 'react-native';

export class DrinkList extends React.PureComponent {
  state = {
    
  };

  _keyExtractor = (item, index) => item.address;

  _onPressItem = (pair) => {
    this.props.onPressItem(pair);
  };

  _onLongPressItem = (pair) => {
    this.props.onLongPressItem(pair);
  };

  _renderItem = ({item}) => (
    <AddressListItem
      props={item}
      item={item}
      balance={item.balance}
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
        <View style={styles.cardItem}>
          <Text style={styles.homeAddressItemHeading}>{this.props.item.name + ' : ' + this.props.item.cryptocurrency}</Text>
          {this.props.item.cryptocurrency == 'ETH' ? <Text style={styles.homeAddressItemText}>{this.props.balance ? 'Wallet Balance: ' + wei2Rounded(this.props.balance,4) : '...'}</Text> : null}
          <Text style={styles.homeAddressItemText}>{this.props.item.address}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}