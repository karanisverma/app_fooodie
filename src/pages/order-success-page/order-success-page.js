import React from 'react'
import { View, Text, Button, Image, TouchableOpacity, Platform, ScrollView, Alert} from 'react-native'
import { ActionSheet, Container, Header, Body, Title, Right, Content } from 'native-base'
import {connect} from 'react-redux'
import TearLines from "react-native-tear-lines";
import { Ionicons } from '@expo/vector-icons';
import { orderCancel } from '../../actions/userAction'
import Loader from '../../components/loader'
import { Amplitude } from 'expo';
import Sentry from 'sentry-expo';
var BUTTONS = ["Cancel the order", "Close"];
var CANCEL_INDEX = 1;
class OrderSuccessPage extends React.Component {

  constructor() {
    super();
    this.state = {
      showCancelOrder: true,
      loader: false
    };
  }
  // hiding default header of react navigation
  static navigationOptions = {
    header: null
  }
  
  componentDidMount() {
    this.props.navigation.setParams({
      paramCall: this.paramCall
    });
    setTimeout(() => {
    this.setState({ showCancelOrder: false })
  }, 60000);
  }

  componentWillMount() {
    Amplitude.logEvent('page_order_success');
  }

  paramCall = () => {
    this.setState({ loader: true })
    this.props.dispatch(orderCancel(this.props.userInfo.phone, this.props.userInfo.key, this.props.orderDetailsList.order_id))
    .then (res => {
      if(res.success) {
        this.setState({ loader: false })
        Alert.alert(
          `Order has been cancelled successfully.`,
          '', [{
            text: 'OK',
            onPress: () => {
              this.setState({loader: true});
              Amplitude.logEvent('User cancelled the order');
              this.props.navigation.navigate("FooterNavigation");
            }
          }
          ], {
            cancelable: false
          }
        )
      } else {
        this.setState({ loader: false })
        Alert.alert(
          `Something went wrong! Please try again.`,
          '', [{
            text: 'OK'
          },
          ], {
            cancelable: false
          }
        )
      }
    })
  }

  // static navigationOptions = ({ navigation }) => {
  //   const { params = {} } = navigation.state;
  //   return {
  //   title: `${navigation.state.params.title}`,
  //   headerForceInset: Platform.OS === 'android' ? { top: 'never', bottom: 'never' } : null,
  //   headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
  //   headerStyle: {
  //     backgroundColor: 'white',
  //   },
  //   headerRight:<Ionicons
  //     name={Platform.OS === 'android' ? 'md-more' : 'ios-more'}
  //     size={30}
  //     style={{paddingRight: 20}}
  //     color='#444'
  //     onPress={() =>
  //       ActionSheet.show(
  //         {
  //           options: BUTTONS,
  //           cancelButtonIndex: CANCEL_INDEX,
  //           title: "You can cancel your order!"
  //         },
  //         buttonIndex => {
  //           if (buttonIndex === 0) {
  //             params.paramCall();
  //           }
  //         }
  //       )}
  //   />,
  //     headerLeft: null
  //     }
  // };

  render() {
    return (
      
      <Container style={{backgroundColor: 'white'}}>
        {this.state.loader ? <Loader /> : null} 
         <Header style={styles.appContainer}>
          <Body>
            <Title>Order Placed</Title>
          </Body>
          {this.state.showCancelOrder ? <Right>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-more' : 'ios-more'}
              size={30}
              style={{ paddingRight: 20 }}
              color='#444'
              onPress={() =>
                ActionSheet.show(
                  {
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    title: "Order cancellation options"
                  },
                  buttonIndex => {
                    if (buttonIndex === 0) {
                      this.paramCall();
                    }
                  }
                )}
            />
            </Right>
            : <Right /> }
        </Header>
        <Content>
          <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.successPageWrapper}>

        {/* Total Wrapper */}
        <View style = {styles.orderSuccessWrapper}>
            <Text style = {styles.orderSuccessText}>YOUR ORDER IS PLACED SUCCESSFULLY</Text>
            <Image source={require('../../assets/img/success-page/celebration.png')} style={styles.successCelebration} resizeMode="contain" />
            <Image source={require('../../assets/img/success-page/flags.png')} style={styles.successFlagImage} resizeMode="contain" />
          </View>
        <View style = {styles.detailsAndCTAWrapper}>
        <View style= {styles.sectionWrapper}>
          <View style={{paddingBottom: 10}}>
            <Text style={styles.totalContent}>Order Id: {this.props.orderDetailsList ? this.props.orderDetailsList.order_id : null}</Text>
          </View>

          <Text style={styles.totalContent}>Order Details</Text>
          <View style={styles.subTotal}>
            <View style={styles.orderInfo}>
              {this.props.orderDetailsList ? this.props.orderDetailsList.order_details.map((orderItem, key) => <View style={styles.detailsWrapper} key={orderItem.product_id}>
                  <Text style={styles.flexThree}>{orderItem.product_name}</Text>
                  <Text style={styles.flexOne}>x {orderItem.product_quantity}</Text>
                  <Text style={styles.rupees}>₹{orderItem.product_cost}</Text>
                </View>
              )
            : null}
            </View>
          </View>

          {this.props.orderDetailsList.delivery_charge > 0 ? <View style={styles.orderIdOrderAmountWrapper}>
            <View style={styles.total}>
              <Text style={styles.totalContent}>Delivery Charge: </Text>
              <Text>₹{this.props.orderDetailsList.delivery_charge}</Text>
            </View>
          </View>
          : null }

          <View style={styles.orderIdOrderAmountWrapper}>
          {/* wrapper for order id and order amount */}
            <View style={styles.total}>
              <Text style={styles.totalContent}>Order Amount: </Text>
                {this.props.orderDetailsList ? <Text style={styles.totalText}>₹{this.props.orderDetailsList.order_amount_paid + this.props.orderDetailsList.delivery_charge}</Text> : null }
            </View>

          </View>
          <View style={styles.addressWrapper}>
            <Text style={styles.deliveryLable}>Delivery Address: </Text>
                <Text style={styles.deliveryAddress}> {
                  this.props.orderDetailsList.location.flat_number}, {this.props.orderDetailsList.location.landmark}, {this.props.orderDetailsList.location.google_map_formatted_address}
                </Text>
          </View>

          <View style={styles.noteWrapper}>
            <Text style={styles.deliveryLable}>Note: </Text>
                <Text style={styles.noteText}>
                  This order would be accepted after confirmation call on {this.props.orderDetailsList.contact_number}, Please make sure this number is reachable.
                </Text>
          </View>
        </View>

        {/* Deliver Address wrapper */}

          <View>
              <TearLines
              ref="top"
              color="#FFFFFF"
              backgroundColor="#CCCCCC" />
              <View style={styles.CTAWrapper}     
              onLayout={e => {this.refs.top.onLayout(e);}}>
                <TouchableOpacity style={styles.Button} onPress={() => this.props.navigation.replace("PastOrders", { title: "Past Orders", activePage: 1 })}>
                  <Text style={styles.buttonText}>
                    Track Order
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            </View>
        </View>
          </ScrollView>
        </Content>
        </Container>
    )
  }
}

const styles = {
  appContainer: {
    ...Platform.select({
      ios: {
        paddingTop: 15,
        paddingLeft: 125
      },
      android: {
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 20
      }
    })
  },
  CTAWrapper:{
    backgroundColor:'white'
  },
  detailsAndCTAWrapper:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  Button: {
    bottom:0,
    alignSelf: 'center',
    backgroundColor: '#f17f20',
    marginTop: 15,
    marginBottom: 20,
    paddingLeft: 30,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 30,
    borderRadius: 0
  },
  buttonText: {
    fontSize: 18,
    letterSpacing: 1,
    color: '#f5f5f5',
    fontWeight: 'bold'
  },
  successFlagImage:{
    position:'absolute',
    width:65,
    height:65
  },
  successCelebration: {
    position:'absolute',
    width:65,
    height:65,
    bottom:0,
    right:0
  },
  orderSuccessWrapper: {
    position: 'relative'
  },
  addressWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop:15,
    paddingLeft: 7
  },
  noteWrapper: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingTop:15,
    paddingLeft:7
  },
  deliveryLable: {
    fontWeight: 'bold',
    color: '#666666'
  },
  deliveryAddress:{
    width:200,
    color: '#666666'
  },
  noteText:{
    color: '#666666',
    paddingLeft: 3
  },
  orderIdOrderAmountWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10
  },
  successPageWrapper: {
    flex:1
  },
  allCart: {

  },
  sectionWrapper: {
    borderColor: '#ccc',
    borderTopWidth: 7,
    borderBottomWidth: 7,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white'
  },
  orderSuccessText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    fontSize: 25,
    color: '#ffffff',
    backgroundColor: '#4c4c4c',
    textAlign:'center',
    paddingTop:65,
    paddingBottom:65,
    color: '#f8e71c'
  },
  subTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  totalText: {
    fontSize: 14,
    color: '#666666'
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 7,
    width: '100%'
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
  detailsWrapper: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%'
  },
  flexOne: {
    flex: 1,
    fontSize: 14
  },
  flexThree: {
    flex: 3,
    fontWeight: '500'
  },
  rupees: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14
  },
  orderInfo: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#bbb',
    width: '100%'
  }
}

const mapStateToProps = state => ({
  orderDetailsList: state.productInfo.placedOrder.orderDetails,
  products: state.productInfo.products,
  userInfo: state.user.info,
})

export default connect(mapStateToProps)(OrderSuccessPage)
