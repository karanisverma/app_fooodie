import React from 'react'
import { Image, View, ScrollView } from 'react-native'
// import { View, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem, Thumbnail } from 'native-base';
import { Container, Body, Title, Header, Tab, Tabs, ScrollableTab, ListItem, Text, Left, Thumbnail, Right, Spinner } from 'native-base';
import { StyleSheet, Platform } from 'react-native'
import { MenuItem } from '../../components/menu-item'
import { connect } from "react-redux";
import { API_HOST } from '../../env'
import * as productAction from '../../actions/productAction'
import { selectActiveTab } from '../../actions/homepageAction'
import { Amplitude } from 'expo';
import Sentry from 'sentry-expo';
class Menu extends React.Component {

  state = {
    productList: '',
    loader: true,
    initialPage: 0
  }
  componentWillMount() {
    Amplitude.logEvent('page_menu');
    const {dispatch} = this.props
    if(this.props.products.length === 0) {
      dispatch(productAction.fetchAllProducts()).then(res => {
        this.setState ({
          loader: false
        })
        // Refactor :- Api should not return the name as object
      })
      .catch(error => {
        Sentry.captureException(new Error('API: Get Product', error));                      
        console.error(' Errror ===> ', error)
      })
    } else {
      this.setState ({
        loader: false
      })
    }
  }
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <Container>
        
        <Header hasTabs style={styles.menuContainer}>
          <Body>
            <Title>Menu</Title>
          </Body>
        </Header>
        
        <Tabs 
          initialPage={this.state.initialPage} 
          onChangeTab={({ i, ref, from })=> this.props.dispatch(selectActiveTab(i))}
          page={this.props.navigation.getParam('activePage', this.props.activeTab)} 
          renderTabBar={() => <ScrollableTab />}
        >
          <Tab heading="SNACKS" id="snacks">
            {this.state.loader ? <Spinner color= '#393018' style={styles.styleLoader} /> : null}
          <ScrollView>
              
            {this.props.products ? this.props.products.map((product,index) => 
                (product.category === 'snacks' ? 
                  <MenuItem
                    id={product.product_id}
                    key={product.product_id}
                    menuTitle={product.name}
                    menuPrice={product.price}
                    itemImage={`${API_HOST}${product.image}`}
                    itemQuantity={product.quantity}
                    menuType = {product.type}
                    offerPrice = {product.offer_price}
                    itemStatus = {product.status}
                    sufficientFor={product.sufficient_for}
                  />
                : null)
            ):null}
          </ScrollView>
          </Tab>
          <Tab heading="CURRY" id="curry">
            <ScrollView>
              {this.props.products ? this.props.products.map((product, index) =>
                (product.category === 'Curry' ?
                  <MenuItem
                    id={product.product_id}
                    key={product.product_id}
                    menuTitle={product.name}
                    menuPrice={product.price}
                    itemImage={`${API_HOST}${product.image}`}
                    itemQuantity={product.quantity}
                    menuType={product.type}
                    offerPrice={product.offer_price}
                    itemStatus={product.status}
                    sufficientFor={product.sufficient_for}
                  />
                  : null)
              ) : null}
            </ScrollView>
          </Tab>
          <Tab heading="RICE & BIRIYANI" id="rice_biriyani">
            <ScrollView>
              {this.props.products ? this.props.products.map((product,index) => 
                (product.category === 'Rice & Biriyani' ?
                  <MenuItem
                    id={product.product_id}
                    key={product.product_id}
                    menuTitle={product.name}
                    menuPrice={product.price} 
                    itemImage={`${API_HOST}${product.image}`}
                    itemQuantity={product.quantity}
                    menuType = {product.type}
                    offerPrice={product.offer_price} 
                    itemStatus={product.status}
                    sufficientFor={product.sufficient_for}
                />
                : null)
            ):null}
          </ScrollView>
          </Tab>
          <Tab heading="ROLLS & PARATHAS" id="rolls_parathas">
            <ScrollView>
              {this.props.products ? this.props.products.map((product, index) =>
                (product.category === 'Rolls & Prathas' ?
                  <MenuItem
                    id={product.product_id}
                    key={product.product_id}
                    menuTitle={product.name}
                    menuPrice={product.price}
                    itemImage={`${API_HOST}${product.image}`}
                    itemQuantity={product.quantity}
                    menuType={product.type}
                    offerPrice={product.offer_price}
                    itemStatus={product.status}
                    sufficientFor={product.sufficient_for}
                  />
                  : null)
              ) : null}
            </ScrollView>
          </Tab>
          <Tab heading="DRINKS & DESSERTS" id="drink_desserts">
            <ScrollView>
              {this.props.products ? this.props.products.map((product, index) =>
                (product.category === 'Drink & Desserts' ?
                  <MenuItem
                    id={product.product_id}
                    key={product.product_id}
                    menuTitle={product.name}
                    menuPrice={product.price}
                    itemImage={`${API_HOST}${product.image}`}
                    itemQuantity={product.quantity}
                    menuType={product.type}
                    offerPrice={product.offer_price}
                    itemStatus={product.status}
                    sufficientFor={product.sufficient_for}
                  />
                  : null)
              ) : null}
            </ScrollView>
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

const styles = {
  styleLoader: {
    flex: 1
  },
  menuContainer: {
    ...Platform.select({
      ios: {
        paddingTop: 15,
      },
      android: {
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 30
      }
    })
  }
}

const mapStateToProps = state => {
  return {
  products: state.productInfo.products,
  activeTab: state.homePageInfo.activeTab
}}

export default connect(mapStateToProps)(Menu)