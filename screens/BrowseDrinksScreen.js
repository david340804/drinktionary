import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import autobind from 'autobind-decorator'

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
          //console.log(responseJson);
          try{
            //this.addBalanceData(responseJson.result);
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

  addDrinkData(){

  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
