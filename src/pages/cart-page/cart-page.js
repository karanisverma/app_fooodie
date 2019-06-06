import React from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, Image, Platform, KeyboardAvoidingView} from 'react-native';
import { MenuItem } from '../../components/menu-item';
import TearLines from "react-native-tear-lines";
import { connect } from 'react-redux';
import { Container, ActionSheet, Content, Toast, Item, Input, Icon} from "native-base";
import { Amplitude } from 'expo';
import Sentry from 'sentry-expo';

import { API_HOST } from '../../env';
import { selectAddress } from '../../actions/userAction';

var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

class CartPage extends React.Component {
  state= {
    orderCost: 0,
    addresses:[],
    isAddressSelected: false,
    deliverFee:0,
    deliveryContactNumber: this.props.userInfo.phone
  }
  constructor(props) {
    super(props);
    state= {
      orderCost: 0,
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerForceInset: Platform.OS === 'android' ? { top: 'never', bottom: 'never' } : null,
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: 'white',
    },
  });


  getAddressOptions = () => {
    this.state.addresses = this.props.userInfo.address.map((addr) => addr.flat_number)
  }
  getOrderCost = () => {
    let productsInCart = this.props.products.filter((p) =>(p.quantity>0))
    // because if offer exist only offer price should be applied.
    let orderCost = productsInCart.reduce((bill, product) => (parseInt(bill) + (product.quantity * (product.offer_price||product.price))), 0)
    this.state.orderCost = orderCost
    if(this.state.orderCost > this.props.minimumOrderAmount && this.state.orderCost < this.props.freeDeliveryOrderAmount){
      this.state.deliverFee = this.props.deliveryFee
    } else if(this.state.orderCost >= this.props.freeDeliveryOrderAmount){
      this.state.deliverFee = 0
    }
  }
  handleChangeAddress = () => {
    this.props.userInfo.selectedAddress = null;
    this.setState({ isAddressSelected: false });
    Amplitude.logEvent('Location change on cart page');
    }

  componentWillMount() {
    Amplitude.logEvent('page_cart');
    Amplitude.setUserProperties({
      email: this.props.userInfo.email,
      phone: this.props.userInfo.phone,
    });
  }

  render() {
    this.getOrderCost()
    this.getAddressOptions()
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 30 : 0    
    return (
      <Container>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={keyboardVerticalOffset}>
        <ScrollView>
      <View style={styles.cartWrapper}>
        <ScrollView contentContainerStyle={{
           flex:1,
           backgroundColor:"#eee"
        }}>
          {
            this.state.orderCost === 0 ? 
            <View style ={styles.cartEmptyWrapper}>
              <Image style={styles.cartEmptyImg} source={require('../../assets/img/cooking.png')} />
              <Text style={styles.cartEmptyText}>Cart is Empty</Text>
              <TouchableOpacity onPress={
                () => this.props.navigation.navigate("FooterNavigation")}>
                <Text style={styles.cartEmptyButton}> Go to Home Screen</Text>
              </TouchableOpacity>
            </View>
            :
        <View style={styles.detailsAndCTAWrapper}>
          <View style={styles.detailsWrapper}>
            <View style= {styles.allCart}>
                  {this.props.products ? this.props.products.map((product,index) => 
                    (product.quantity > 0 ?
                      <MenuItem
                        id={product.product_id}
                        key={product.product_id}
                        menuTitle={product.name}
                        menuPrice={product.price} 
                        itemImage={`${API_HOST}${product.image}`}
                        itemQuantity={product.quantity}
                        menuType = {product.type}
                        offerPrice={product.offer_price} 
                        itemStatus = {product.status}
                        sufficientFor={product.sufficient_for}
                    />
                    : null)
                ):null}
            </View>
            <View style= {styles.totalWrapper}>
              <View style = {styles.subTotal}>
                <Text style = {styles.totalText}>Subtotal</Text>
                <Text style={styles.totalText}>₹{this.state.orderCost}</Text>
              </View>
              { this.state.orderCost < this.props.freeDeliveryOrderAmount ? 
                <View>
                <View style={styles.subTotal}>
                  <View>
                    <Text style={styles.totalText}>Delivery Fee</Text>
                    <Text style={styles.freeDelivery}>Free delivery above ₹{this.props.freeDeliveryOrderAmount}</Text>
                  </View>
                  <Text style={styles.totalText}>₹{this.state.deliverFee}</Text>
                </View>
                <View style={styles.total}>
                  <Text style={styles.totalContent}>TOTAL</Text>
                  <Text style={styles.totalContent}>₹{this.state.orderCost+this.state.deliverFee}</Text>
                </View>
                </View>
              :
              <View>
              <View style={styles.subTotal}>
                <View>
                  <Text style={styles.totalText}>FREE Delivery</Text>
                  <Text style={styles.freeDelivery}>Enjoy Free Delivery :)</Text>
                </View>
                <Text style={styles.totalText}>₹0</Text>
              </View>
              <View style={styles.total}>
                <Text style={styles.totalContent}>TOTAL</Text>
                <Text style={styles.totalContent}>₹{this.state.orderCost}</Text>
              </View>
              </View>
              }
            </View>
            <View>
              <View style={styles.totalWrapper}>
                { (this.state.isAddressSelected || this.props.userInfo.selectedAddress) ? <View>
                    <View style={styles.titleWrapper}>
                      <Text style={styles.sectionTitle}>Delivery Address</Text>
                    </View>
                    <View>
                      {this.props.userInfo.selectedAddress ? <View style={styles.fullAdress}>
                          <View style={styles.addressDetails}>
                            {this.props.userInfo.selectedAddress.flat_number ? <Text style={styles.addressText}>
                                {this.props.userInfo.selectedAddress.flat_number}
                            </Text> : null} 

                            {this.props.userInfo.selectedAddress.landmark ?<Text style={styles.addressText}>
                              {this.props.userInfo.selectedAddress.landmark}
                            </Text> : null}

                            {this.props.userInfo.selectedAddress.google_map_formatted_address ?<Text style={styles.addressText}>
                              {this.props.userInfo.selectedAddress.google_map_formatted_address}
                            </Text> : null}

                            {/* <Text style={styles.addressText}>{this.props.userInfo.selectedAddress.city}, {this.props.userInfo.selectedAddress.zipcode}</Text> */}
                          </View>
                          <View style={styles.addressChange}>
                            <Text style={{ color: '#f17f20' }} onPress={() => this.handleChangeAddress()}>CHANGE</Text>
                          </View>
                        </View>
                        : null}
                      </View>
                    </View>
                  : <View style={styles.addressSection}>
                    <TouchableOpacity style={styles.Button} 
                    onPress={
                      () => this.props.navigation.navigate("AddressSelector", { title: "Delivery Address Details" })
                    }
                    >
                      <Text style={styles.buttonText}>
                        ADD ADDRESS
                      </Text>
                    </TouchableOpacity>
                    {this.state.addresses.length>1
                      ?
                      <TouchableOpacity style={styles.ButtonActive} 
                      onPress={() =>
                        ActionSheet.show(
                          {
                            options: this.state.addresses,
                            cancelButtonIndex: this.state.addresses.length-1,
                            title: "Select Address"
                          },
                          buttonIndex => {
                            if (buttonIndex == (this.state.addresses.length - 1)){
                              this.setState({ isAddressSelected: false })
                            } else {
                              this.setState({ isAddressSelected: true });
                              Amplitude.logEvent('Location select on cart page');
                            }
                            
                            this.props.dispatch(selectAddress(this.props.userInfo.address[buttonIndex]))
                          }
                        )}
                      >
                        <Text style={styles.buttonTextActive}>
                          SELECT ADDRESS
                        </Text>
                      </TouchableOpacity>
                      :
                    null}
                  </View>
                }
                </View>
            </View>
          </View>
          <View style={styles.contactNumberContainer}>
          <View style={styles.contactNumberWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.sectionTitle}>Contact Number</Text>
          </View>
          <Item>
            <Icon active name='ios-phone-portrait' />
            <Input 
              placeholder='Mobile Number'
              style={styles.inputText} 
              keyboardType='numeric'
              placeholderTextColor={"#cccccc"}
              maxLength = {10}
              value={this.state.deliveryContactNumber} 
              onChangeText={(deliveryContactNumber) =>this.setState({deliveryContactNumber})}/>
          </Item>
          <Text style={styles.contactNumberInfoText}>
          We will call you on this number at the time of order confirmation & delivery.
          </Text>
          </View>
          </View>

          <View style={styles.CTASection}>
          {this.props.userInfo.selectedAddress !=null && this.state.orderCost>this.props.minimumOrderAmount && this.state.deliveryContactNumber.length == 10
              ?
              <View>
                <TearLines
                ref="top"
                color="#FFFFFF"
                backgroundColor="#CCCCCC" />
                <View style={styles.CTAWrapper}     
                onLayout={e => {this.refs.top.onLayout(e);}}>
                  <TouchableOpacity style={styles.ButtonCTA}
                    onPress={() => {
                      if (this.state.deliveryContactNumber !== this.props.userInfo.phone) Amplitude.logEvent('User has changed default phone number')
                      Amplitude.logEvent('User has moved to payment page')
                      this.props.navigation.navigate("PaymentPage", { title: "Payment Page", contactNumber: this.state.deliveryContactNumber })
                      }
                    }>
                    <Text style={styles.buttonTextCTAPayment}>
                      Proceed to Payment
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              :
              <View>
                <TearLines
                ref="top"
                color="#FFFFFF"
                backgroundColor="#CCCCCC" />
                <View style={styles.CTAWrapper}     
                onLayout={e => {this.refs.top.onLayout(e);}}>
                  <TouchableOpacity style={styles.ButtonCTADisabled}
                  onPress={() => {
                    let toastMessage = this.props.userInfo.selectedAddress ==null ? "Please Select/Add Address to continue." : `Minimum Order Amount is ${this.props.minimumOrderAmount}`
                    toastMessage = this.state.deliveryContactNumber.length!=10 ? "Please enter valid mobile number" : toastMessage
                    Toast.show({ 
                        text: toastMessage,
                        buttonText: "X",
                        duration: 3000,
                        position: "bottom",
                        style: {
                          backgroundColor: "gray"
                        }
                      })
                      Amplitude.logEvent('Invalid Cart information toast');
                    }
                      }>
                    <Text style={styles.buttonTextCTA}>
                      Proceed to Payment
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
          </View>
        </View>         
        }
        </ScrollView>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
      </Container>
    )
  }
}

const styles = {
  inputText: {
    fontSize:14,
    color:'#666666',
    fontWeight:'bold',
    textAlign: 'left',
  },
  contactNumberContainer: {
    backgroundColor:'white',
    paddingTop:10,
    paddingBottom:10,
    marginBottom:10,
  },
  contactNumberWrapper:{
    paddingLeft: 25,
    paddingRight: 25,
    
  },
  titleWrapper:{
    borderColor:'#ccc',
    borderBottomWidth: 1
  },
  sectionTitle:{
    color: '#666666',
    fontWeight: 'bold',
    marginBottom: 5,
    // maringTop:10,
  },
  addressDetails:{
    flexDirection: 'column',
    paddingTop:10,
    flex: 4
  },
  addressText: {
    fontSize:12,
    color: '#666666',
    textAlign: 'left'
  },
  contactNumberInfoText: {
    fontSize:12,
    color: '#666666',
    textAlign: 'left',
    flex: 1, 
    flexWrap: 'wrap',
  },
  detailsAndCTAWrapper:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  detailsWrapper:{},
  CTASection:{},
  allCart: {
    backgroundColor: 'white'
  },
  CTAWrapper:{
    backgroundColor:'white'
  },
  ButtonCTA: {
    bottom:0,
    alignSelf: 'center',
    backgroundColor: '#f17f20',
    marginTop: 12,
    paddingTop: 12,
    marginBottom: 20,
    paddingBottom: 12,
    paddingRight: 65,
    paddingLeft: 65
  },
  ButtonCTADisabled: {
    bottom:0,
    alignSelf: 'center',
    backgroundColor: '#eee',
    marginTop: 12,
    paddingTop: 12,
    marginBottom: 20,
    paddingBottom: 12,
    paddingRight: 65,
    paddingLeft: 65,
    borderRadius: 0,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#eee'
  },
  Button: {
    bottom:0,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 12,
    paddingTop: 12,
    marginBottom: 20,
    paddingBottom: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 0,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#7a7a7a'
  },
  ButtonActive: {
    bottom:0,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 12,
    paddingTop: 12,
    marginBottom: 20,
    paddingBottom: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 0,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#f17f20'
  },
  buttonTextCTA: {
    fontSize: 12,
    letterSpacing: 1,
    color: 'black',
    fontWeight: 'bold'
  },
  buttonTextCTAPayment: {
    fontSize: 12,
    letterSpacing: 1,
    color: '#f5f5f5',
    fontWeight: 'bold'
  },
  buttonTextActive: {
    fontSize: 10,
    letterSpacing: 1,
    color: '#f17f20',
    fontWeight: 'bold'  
  },
  buttonText: {
    fontSize: 10,
    letterSpacing: 1,
    color: '#7a7a7a',
    fontWeight: 'bold'
  },
  cartWrapper: {
    flex: 1,
    backgroundColor: '#fff'
  },
  totalWrapper: {
    borderColor: '#ccc',
    borderTopWidth: 7,
    borderBottomWidth: 7,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white'
  },
  subTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    backgroundColor: 'white'
  },
  totalText: {
    fontSize: 14,
    color: '#666666'
  },
  total: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 7
  },
  totalContent: {
    fontWeight: 'bold',
    color: '#666666'
  },
  freeDelivery: {
    fontSize: 10,
    color: '#666666'
  },
  addressSection: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  addressButton: {
    borderWidth: 2,
    borderColor: '#ccc'
  },
  cartEmptyWrapper: {
    height: 500,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  cartEmptyImg: {
    width: 100,
    height: 100
  },
  cartEmptyText: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
    color: '#858585',
    fontWeight: '600'
  },
  cartEmptyButton: {
    borderWidth: 1,
    borderColor: '#858585',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 20,
    fontWeight: '600',
    color: '#858585',
    borderRadius: 3
  },
  fullAdress: {
    flexDirection: 'row'
  },
  addressChange: {
    flex: 2,
    alignSelf: 'center',
    alignItems: 'center'
  }
}


const mapStateToProps = state => ({
  products: state.productInfo.products,
  userInfo: state.user.info,
  minimumOrderAmount: state.productInfo.minimumOrderAmount,
  deliveryFee: state.productInfo.deliveryCharge,
  freeDeliveryOrderAmount: state.productInfo.freeDeliveryOrderAmount
});

export default connect(mapStateToProps)(CartPage)
