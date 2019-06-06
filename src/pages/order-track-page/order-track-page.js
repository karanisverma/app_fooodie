import React from 'react'
import { View, Text, Button, Image, TouchableOpacity, Platform, ScrollView} from 'react-native'
import TearLines from "react-native-tear-lines";
import StepIndicator from 'react-native-step-indicator';
import { Amplitude } from 'expo';
import Sentry from 'sentry-expo';
const labels = ["Accept","Out of Delivery","Delivered"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#efec42',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#efec42',
  stepStrokeUnFinishedColor: '#dedede',
  separatorFinishedColor: '#efec42',
  separatorUnFinishedColor: '#dedede',
  stepIndicatorFinishedColor: '#efec42',
  stepIndicatorUnFinishedColor: '#4c4c4c',
  stepIndicatorCurrentColor: '#efec42',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#efec42'
}

class OrderTrackPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        currentPosition: 1
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

  componentWillMount() {
    Amplitude.logEvent('page_order_track');
  }

  handleTryAgain() {
    console.log('handling try again')
  }
  render() {
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.successPageWrapper}>
          <View style = {styles.orderFailureWrapper}>
            <View style={styles.orderFailureTextWrapper}>
            <StepIndicator
         style = {styles.stepIndicator}
         customStyles={customStyles}
         stepCount= {3}
         currentPosition={this.state.currentPosition}
         labels={labels}
    />
            </View>
          </View>
          <View style = {styles.detailsAndCTAWrapper}>
            <View style= {styles.sectionWrapper}>
              <View style={styles.subTotal}>
                <View>
                  <Text style={styles.totalContent}>ORDER  DETAILS</Text>
                </View>
              </View>
              

              <View style={styles.orderIdOrderAmountWrapper}>
          {/* wrapper for order id and order amount */}
            <View style={styles.total}>
              <Text style={styles.totalContent}>Order Id: </Text>
              <Text style={styles.totalText}>WQSAE123S</Text>
            </View>
            <View style={styles.total}>
              <Text style={styles.totalContent}>Order Amount: </Text>
              <Text style={styles.totalText}>₹100</Text>
            </View>
          </View>


              <View>
                <View style={styles.addressWrapper}>
                  <Text style={styles.deliveryLable}>Delivery Address : </Text>
                  <Text style={styles.deliveryAddress}>We were not able to place your order because your online payment failed due to unknown reasons. Try again or choose COD.</Text>
                </View>
                <View style={styles.addressWrapper}>
                  <Text style={styles.deliveryLable}>Ordered Items : </Text>
                  <View>
                    <Text style={styles.deliveryAddress}>
                      1x Paneer Butter Masala
                    </Text>
                    <Text style={styles.deliveryAddress}>
                      1x Paneer Butter Masala
                  </Text>
                  </View>
                  
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
                <TouchableOpacity style={styles.Button} onPress={this.handleTryAgain.bind(this)}>
                  <Text style={styles.buttonText}>
                    CLOSE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

      </View>
      </ScrollView>
    )
  }
}

const styles = {
  stepIndicator: {
    width:200
  },
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
    width:450
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
    backgroundColor: 'white',
    marginTop: 12,
    paddingTop: 12,
    marginBottom: 20,
    paddingBottom: 12,
    paddingRight: 60,
    paddingLeft: 60,
    borderRadius: 0,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#efec42'

  },
  buttonText: {
    fontSize: 18,
    letterSpacing: 1,
    color: 'black',
    fontWeight: 'bold'
  },
  addressWrapper: {
    
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop:15,
    justifyContent: 'space-between'
  },
  deliveryLable: {
    fontWeight: 'bold',
    color: '#666666'
  },
  deliveryAddress:{
    width:190,
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

export default OrderTrackPage
