import React from 'react'
import {Container, View, Text} from 'native-base'
import {connect} from 'react-redux'
import { Amplitude } from 'expo'; 
import Sentry from 'sentry-expo';

class OrderDetails extends React.Component {
  componentWillMount() {
    Amplitude.logEvent('page_order_details');
  }
  render() {
    let val = this.props.navigation.state.params.orderId
    let orderItem = this.props.userInfo.orders.find(a => {return val === a.order_id})
    return (
      <Container style={{backgroundColor: 'white'}}>
        <View style={styles.orderInfo}>
        {orderItem ? orderItem.order.map((product, index) => (
          <View key={index}>
            <View style={styles.detailsWrapper}>
              <Text style={styles.flexThree}>{product.product_name}</Text>
              <Text style={styles.flexOne}>x {product.quantity}</Text>
              {product.offer_price ? <Text style={styles.rupees} >₹{product.offer_price}</Text> 
              : <Text style={styles.rupees} >₹{product.price}</Text>}

              {product.offer_price ? <Text style={styles.rupees} >₹{product.offer_price * product.quantity}</Text>
              : <Text style={styles.rupees} >₹{product.price * product.quantity}</Text> }
              
            </View>
            </View>
          ))
          :
          <Text>Something went wrong! </Text>}
        </View>

        <View style={styles.orderInfo}>
          <View style={styles.detailsWrapper}>
            <Text style={styles.flexThree}>Item Total</Text>
            <Text style={styles.flexOne}>{orderItem.order.length} items</Text>
            <Text style={styles.rupees}>₹{orderItem.paidamount}</Text>
          </View>

          <View style={styles.detailsWrapper}>
            <Text style={styles.flexThree}>Delivery Charges</Text>
            <Text style={styles.flexOne}></Text>
            <Text style={styles.rupees}>₹{orderItem.delivery_charge}</Text>
          </View>
        </View>

        <View>
          <View style={styles.detailsWrapper}>
            <Text style={styles.flexThree}>Paid</Text>
            <Text style={styles.flexOne}>Total</Text>
            <Text style={styles.rupees}>₹{orderItem.paidamount + orderItem.delivery_charge}</Text>
          </View>
        </View>

        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', padding: 15 }}>LOCATION:</Text>
          <View style={styles.locationWrapper}>
            <Text style={styles.locationLabel}>Flat Number: </Text>
            <Text style={styles.locationField}>{orderItem.location.flat_number}</Text>
          </View>
          <View style={styles.locationWrapper}>
            <Text style={styles.locationLabel}>Landmark: </Text>
            <Text style={styles.locationField}>{orderItem.location.landmark}</Text>
          </View>
          <View style={styles.locationWrapper}>
            <Text style={styles.locationLabel}>Full Address: </Text>
            <Text style={styles.locationField}>{orderItem.location.google_map_formatted_address}</Text>
          </View>
        </View>
      </Container>
    )
  }
}

const styles = {
  detailsWrapper: {
    flexDirection: 'row',
    padding: 10
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
    borderBottomWidth: 1,
    borderBottomColor: '#bbb'
  },
  locationWrapper: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5
  },
  locationLabel: {
    fontWeight: '600'
  },
  locationField: {
    width: '75%'
  }
}

const mapStateToProps = state => ({
  userInfo: state.user.info
})

export default connect(mapStateToProps)(OrderDetails)