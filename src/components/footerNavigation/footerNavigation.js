import React from 'react'
import { StyleSheet, Alert } from 'react-native'
import { TabNavigator } from 'react-navigation';
import Homepage from '../../pages/homepage'
import CartPage from '../../pages/cart-page'
import Menu from '../../pages/menu'
import SearchPage from '../../pages/search-page'
import UserProfile from '../../pages/user-profile'
import { Container, Footer, FooterTab, Button, Icon, Content, Text, View, Toast } from 'native-base';
import { connect } from 'react-redux'
import { checkoutFlow, fetchOutOfStockProducts, fetchAllProducts, deleteFromCart } from '../../actions/productAction'
import { Amplitude } from 'expo';

const styles = {
  costText: {
  },
  Button: {
    alignSelf: 'center',
    backgroundColor: '#f17f20',
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 0,
    borderWidth: 2,
    borderColor: '#f17f20'
  },
  DullButton: {
    alignSelf: 'center',
    backgroundColor: '#eee',
    borderWidth: 2,
    borderColor: '#eee',
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 0
  },
  buttonText: {
    fontSize: 18,
    letterSpacing: 1,
    color: '#f5f5f5'
  },
  dullButtonText: {
    fontSize: 18,
    letterSpacing: 1,
    color: '#393018',
  }
}

class CheckoutComp extends React.Component {
  state= {
    orderCost: 0
  }
  navigateToCart = () =>{
    if(this.props.isLoggedIn){
      this.props.navigation.navigate('CartPage', {title: "Cart"})
    } else {
      this.props.dispatch(checkoutFlow())
      this.props.navigation.navigate("Login", { title: "Login" })
    }
  }
  handelCheckout = () => {
    this.props.dispatch(fetchOutOfStockProducts()).then(res=>{
      if(this.props.soldOut){
        Alert.alert(
          `We are sold out for the day.😟`,
          `Bhilai was way to hungry today! 😨 🤯 , we are working hard to add more resources. We are sorry for your any inconvenience caused.`,
          [{
            text: "It's OK!",
            onPress: () => {
              Amplitude.logEvent('User clicked on SOLDOUT OK');              
            }
          },
          ], {
            cancelable: false
          }
        )
        this.props.dispatch(fetchAllProducts())
      } else if(this.state.orderCost>=this.props.minimumOrderAmount ){
          // check if all the product is in-stock
          // if any one or many item is oos show alert and give them option to remove or cancle
            // if orderCost is higher than minimumOrderAmount than navigate to cart page
            // else remove item from cart and keep user at current page.
          oosProductIds = this.props.oosProducts.map(p => p.product_id)
          productsIds = this.props.products.filter(p=>p.quantity > 0).map(p => p.product_id)
          oosProductsInCartIds = productsIds.filter(oosProductId => -1 !== oosProductIds.indexOf(oosProductId));

          oosProductsInCartNames = oosProductsInCartIds.map(pId => {
            oosProductInCart = this.props.products.find(p => pId == p.product_id)
            return oosProductInCart.name
          })
          oosProductsInCartNames = oosProductsInCartNames.join(' & ')
          alertMessage = oosProductsInCartIds.length > 1 ? `${oosProductsInCartNames} are Sold Out for the day.` : `${oosProductsInCartNames} is Sold Out for the day.`
          if(oosProductsInCartIds.length > 0){
              Alert.alert(
                `${alertMessage} Please press ok to remove them from cart`,
                '', 
                [
                  {
                    text: 'Cancel',
                    onPress: () =>{
                      Amplitude.logEvent('User cancelled the order placement due to OOS items');                                    
                    }
                  },
                  {
                    text: 'Ok',
                    onPress: () => {                                    
                      this.props.dispatch(deleteFromCart(oosProductsInCartIds));
                      Amplitude.logEvent('User removed OOS items from cart');
                    }
                  }
                ]
              )
          }
          const currentTime = new Date();
          let openingTime = new Date();
          let closingTime = new Date();

          openingTime.setHours(17,0,0);
          closingTime.setHours(3,0,0);
          let isStoreClosed = (currentTime > closingTime) && (currentTime < openingTime)
          
          if (oosProductsInCartIds.length === 0){
            if(isStoreClosed) {
              Amplitude.logEvent('User alert about order placement timing');                                                  
              Alert.alert(
                `We are open between ⏱ 5pm - 3am.`,
                "We would be able to deliver your order after 5p.m. 😇 .Please press Continue to proceed for checkout 🤟! ", 
                [
                  {
                    text: 'Cancel',
                    onPress: () => {
                      Amplitude.logEvent('User cancelled order placement');                                                          
                    }
                  },
                  {
                    text: 'Continue',
                    onPress: () => {
                      Amplitude.logEvent('User placed the order');                                                          
                      this.navigateToCart()
                    }
                  }
                ]
              )
            } else {
              Amplitude.logEvent('User moved to cart page');                                                
              this.navigateToCart()
            }
          }
        } else if (this.state.orderCost < this.props.minimumOrderAmount ){
          Toast.show({ 
            text: `Minimum order amount is more than ₹${this.props.minimumOrderAmount}`,
            duration: 2000,
            buttonText: "X",
            position: "bottom",
            style: {
              backgroundColor: "gray"
            }
          })
          Amplitude.logEvent(`user Tried to checkout with less than minimum amount: ${this.state.orderCost}`);
        }

    })
  }
  getOrderCost = () => {
    let productsInCart = this.props.products.filter((p) =>(p.quantity>0))
    // because if offer exist only offer price should be applied.
    this.state.orderCost = productsInCart.reduce((bill, product) => (parseInt(bill) + (product.quantity * (product.offer_price||product.price))), 0)
    return this.state.orderCost
  }
  render() {
    return(
      this.props.shouldShowCheckout  && this.props.currentNavigationIndex !== 3 ? 
        <Button style={this.getOrderCost()>=this.props.minimumOrderAmount ? styles.Button : styles.DullButton} 
                onPress={() => this.handelCheckout()}>
          <Text style={this.getOrderCost()>=this.props.minimumOrderAmount ? styles.buttonText : styles.dullButtonText} >
            Checkout <Text style={this.getOrderCost()>=this.props.minimumOrderAmount ? styles.buttonText : styles.dullButtonText}>({this.getOrderCost()})</Text>
          </Text>
        </Button>
      :
        null
  )
  }
}

const mapStateToProps = state => ({
  products: state.productInfo.products,
  minimumOrderAmount: state.productInfo.minimumOrderAmount,
  soldOut: state.productInfo.soldOut,
  oosProducts: state.productInfo.oosProducts,
  shouldShowCheckout:!state.productInfo.isCartEmpty,
  isLoggedIn: state.user.isLoggedIn
});

const CheckoutWithProps = connect(mapStateToProps)(CheckoutComp);


export const FooterNavigation = TabNavigator(
  {
    Homepage: { screen: Homepage },
    SearchPage: { screen: SearchPage },
    Menu: { screen: Menu },
    UserProfile: { screen: UserProfile }
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
        <View >
          <CheckoutWithProps currentNavigationIndex={ props.navigationState.index } navigation={props.navigation}/>
          <Footer>
            <FooterTab>
              <Button
                active={props.navigationState.index === 0}
                onPress={() => props.navigation.navigate("Homepage")}>
                <Icon name="home" />
              </Button>
              <Button
                active={props.navigationState.index === 1}
                onPress={() => props.navigation.navigate("SearchPage")}>
                <Icon name="search" />
              </Button>
              <Button
                active={props.navigationState.index === 2}
                onPress={() => props.navigation.navigate("Menu")}>
                <Icon name="list-box" />
              </Button>
              <Button
                active={props.navigationState.index === 3}
                onPress={() => props.navigation.navigate("UserProfile")}>
                <Icon name="person" />
              </Button>
            </FooterTab>
          </Footer>
        </View>
      );
    }
  }
);

export default FooterNavigation;
