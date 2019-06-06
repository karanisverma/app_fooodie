import React from 'react'
import { View, Text, Button, Image, TouchableOpacity, Platform} from 'react-native'
import TearLines from "react-native-tear-lines";
import { Amplitude } from 'expo';
import Sentry from 'sentry-expo';

class OrderFailurePage extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerForceInset: Platform.OS === 'android' ? { top: 'never', bottom: 'never' } : null,
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: 'white',
    },
    headerLeft: null
  });

  componentWillMount() {
    Amplitude.logEvent('page_order_failure');
  }

  render() {
    return (
      <View style={styles.successPageWrapper}>
          <View style = {styles.orderFailureWrapper}>
          <Image source={require('../../assets/img/failure-page/sad.png')} style={styles.failureSadFace} resizeMode="contain" />
            <View style={styles.orderFailureTextWrapper}>
            <Text style = {styles.orderFailureText}>OH FISH!</Text>
            <Text style = {styles.orderFailureText}>SOMETHING WENT WRONG</Text>
            </View>
          </View>

          <View style = {styles.detailsAndCTAWrapper}>
            <View style= {styles.sectionWrapper}>
              <View style={styles.subTotal}>
                <View>
                  <Text style={styles.totalContent}>Your order was not placed successfully</Text>
                </View>
              </View>
              <View style={styles.orderIdOrderAmountWrapper}>
                <View style={styles.addressWrapper}>
                  <Text style={styles.deliveryLable}>Why? : </Text>
                  <Text style={styles.deliveryAddress}>We were not able to place your order due to unknown reasons. Please Try again.</Text>
                </View>
              </View>
            </View>
            <View>
              <TearLines
              ref="top"
              color="#FFFFFF"
              backgroundColor="#CCCCCC" />
              <View style={styles.CTAWrapper}     
              onLayout={e => {this.refs.top.onLayout(e);}}>
                <TouchableOpacity style={styles.Button} onPress={() => {
                  Amplitude.logEvent('User clicked on Try Again');
                  this.props.navigation.replace("FooterNavigation")
              }}>
                  <Text style={styles.buttonText}>
                    Try Again
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      </View>
    )
  }
}

const styles = {
  CTAWrapper:{
    backgroundColor:'white'
  },
  detailsAndCTAWrapper:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  successFlagImage:{
    position:'absolute',
    width:65,
    height:65
  },
  failureSadFace: {
    width:65,
    height:65,
    left:0
  },
  orderFailureTextWrapper :{
    width:250
  },
  orderFailureWrapper: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#4c4c4c',
    height:180,
    justifyContent:'center',
    alignItems: 'center'
  },
  orderFailureText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    paddingLeft:10,
    fontSize: 18,
    color: '#ffffff',
    textAlign:'left',
    color: '#f8e71c'
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
  addressWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop:15
  },
  deliveryLable: {
    fontWeight: 'bold',
    color: '#666666',
    paddingBottom: 10
  },
  deliveryAddress:{
    width:275,
    color: '#666666'
  },
  orderIdOrderAmountWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  successPageWrapper: {
    position: 'relative',
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
    backgroundColor: 'white',
  },
  subTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10
  },
  totalText: {
    fontSize: 14,
    color: '#666666'
  },
  total: {
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
  }
}

export default OrderFailurePage
