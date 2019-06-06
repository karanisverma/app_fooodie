import React from 'react'
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
import {Image, View, ScrollView, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import { connect } from "react-redux";
import {MenuItem} from '../../components/menu-item'
import {API_HOST} from '../../env'
import { selectActiveTab } from '../../actions/homepageAction'
import { Amplitude } from 'expo';
import Sentry from 'sentry-expo';
class SearchPage extends React.Component {
  state = {
    searchResult: [],
    loader: true
  }
  static navigationOptions = {
    header: null
  }
  matchProduct(input) {
    var reg = new RegExp(input.split('').join('\\w*').replace(/\W/, ""), 'i');
    return this.props.products.filter(function(person) {
      if (person.name.match(reg)) {
        return person;
      }
    });
  }
  goToTab(tab){
    Amplitude.logEvent(`User clicked on category section---> ${tab}`);    
    const { navigation } = this.props
    this.props.dispatch(selectActiveTab(tab))
    navigation.navigate("Menu")
  }
  findProduct(query) {
    if( query.length === 0 ){
      this.setState({
        searchResult: []
      }) 
    } else {
        let matchingProducts = this.matchProduct(query) 
        this.setState({
          searchResult: matchingProducts
        })
    }
  }
  componentWillMount() {
    Amplitude.logEvent('page_search');
  }
  render() {
    return (
      <Container style={{backgroundColor: 'white'}}>
        <Header searchBar rounded style={styles.searchContainer}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search"  onChangeText={(query) => this.findProduct(query)}/>
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <ScrollView>
            {this.state.searchResult && this.state.searchResult.length > 0 ? this.state.searchResult.map((product,index) => 
                  <MenuItem
                    id={product.product_id}
                    key={product.product_id}
                    menuTitle={product.name}
                    menuPrice={product.price}
                    itemImage={`${API_HOST}${product.image}`}
                    itemQuantity={product.quantity}
                    menuType={product.type} 
                    offerPrice={product.offer_price}
                    itemStatus = {product.status}
                    sufficientFor={product.sufficient_for}
                  />
            ): <View style={styles.categoryContainer}>
                <View style={styles.imageContainer}>
                <TouchableOpacity activeOpacity={.9} onPress={() => this.goToTab(0)}>
                    <Image source={require('../../assets/img/snacks.png')} style={styles.categoryImg} resizeMode="cover" />
                    <View style={styles.imageCategory} />
                  </TouchableOpacity>
                  <Text style={styles.categoryName} onPress={() => this.goToTab(0)}>Snacks</Text>
                </View>

                <View style={styles.imageContainer}>
                <TouchableOpacity activeOpacity={.9} onPress={() => this.goToTab(1)}>
                    <Image source={require('../../assets/img/curry.png')} style={styles.categoryImg} resizeMode="cover" />
                    <View style={styles.imageCategory} />
                  </TouchableOpacity>
                  <Text onPress={() => this.goToTab(1)} style={styles.categoryName}>Curry</Text>
                </View>

                <View style={styles.imageContainer}>
                <TouchableOpacity activeOpacity={.9} onPress={() => this.goToTab(2)}>
                    <Image source={require('../../assets/img/rice-biriyani.jpg')} style={styles.categoryImg} resizeMode="cover" />
                    <View style={styles.imageCategory} />
                  </TouchableOpacity>
                  <Text onPress={() => this.goToTab(2)} style={styles.categoryName}>Rice & Biriyani</Text>
                </View>

                <View style={styles.imageContainer}>
                <TouchableOpacity activeOpacity={.9} onPress={() => this.goToTab(3)}>
                  <Image source={require('../../assets/img/rolls-parathas.png')} style={styles.categoryImg} resizeMode="cover" />
                    <View style={styles.imageCategory} />
                    </TouchableOpacity>
                  <Text onPress={() => this.goToTab(3)} style={styles.categoryName}>Rolls & Parathas</Text>
                </View>

                <View style={styles.imageContainer}>
                <TouchableOpacity activeOpacity={.9} onPress={() => this.goToTab(4)}>
                  <Image source={require('../../assets/img/drinks-desserts.png')} style={styles.categoryImg} resizeMode="cover" />
                    <View style={styles.imageCategory} />
                    </TouchableOpacity>
                  <Text onPress={() => this.goToTab(4)} style={styles.categoryName}>Drinks & Desserts</Text>
                </View>

                <View style={styles.imageContainer}>
                <TouchableOpacity activeOpacity={.9} onPress={() => this.goToTab(0)}>
                  <Image source={require('../../assets/img/all-items.png')} style={styles.categoryImg} resizeMode="cover" />
                    <View style={styles.imageCategory} />
                    </TouchableOpacity>
                  <Text onPress={() => this.goToTab(0)} style={styles.categoryName}>All Items...</Text>
                </View>

              </View>
            }
          </ScrollView>
      </Container>
    )
  }
}
const mapStateToProps = state => {
  return {
  products: state.productInfo.products
}}

const styles ={
  categoryImg: {
    width: '100%',
    height: 185
    // borderWidth: 1,
    // borderColor: 'black'
  },
  categoryContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
  },
  imageCategory: {
    width: '100%',
    height: 185,
    position: 'absolute',
    // backgroundColor: 'red'
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  imageContainer: {
    width: '50%'
    // height: 185
  },
  categoryName: {
    color: 'white',
    position: 'absolute',
    top: 75,
    left: 0,
    right: 0,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  },
  searchContainer: {
    ...Platform.select({
    ios: {
      paddingTop: 15,
    },
    android: {
      paddingTop: 25,
      paddingBottom: 25
    }
  })
  }
}
export default connect(mapStateToProps)(SearchPage)
