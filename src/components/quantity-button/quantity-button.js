import React from 'react'
import { TouchableOpacity} from 'react-native'
import { Container, View, Text, Toast} from 'native-base'
import { connect } from "react-redux";
import { addToCart, removeFromCart } from '../../actions/productAction'

class QuantityButton extends React.Component {
  render() {
    return (     
      <View>
        {this.props.productStatus === 'outofstock' ? 
          <View>
            <TouchableOpacity
              onPress={() => Toast.show({ 
                text: "This item is not available.",
                buttonText: "X",
                duration: 3000,
                // textStyle: { color: "black" },
                style: {
                  backgroundColor: "gray"
                }
              })}>
              <Text style={styles.oosButton}>Sold Out</Text></TouchableOpacity>
          </View>
          : this.props.quantity === 0 ? <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={() => {
                this.props.dispatch(addToCart(this.props.productId))
              }}><Text style={styles.addButton}>Add</Text></TouchableOpacity>
            </View>
            : <View style={styles.quantityButton}>
                <Text style={styles.fontWeightBold}
                  onPress={() => {
                    this.props.dispatch(removeFromCart(this.props.productId))
                  }}
                > - </Text>
                <Text style={styles.fontWeightBold}>{this.props.quantity}</Text>
                <Text style={styles.fontWeightBold}
                  onPress={() => {
                    this.props.dispatch(addToCart(this.props.productId))
                  }}
                > + </Text>
              </View>
        }
      </View>
    )
  }
}

const styles = {
  addButton: {
    borderWidth: 2,
    borderColor: '#f17f20',
    paddingLeft: 27,
    paddingRight: 25,
    paddingTop: 8,
    paddingBottom: 7,
    justifyContent: 'center',
    backgroundColor: '#fff',
    fontSize: 16,
    borderRadius: 18
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#f17f20',
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-between',
    borderRadius: 18
  },
  fontWeightBold: {
    fontWeight: 'bold',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 9,
    paddingRight: 9
  },
  oosButton: {
    fontSize: 12,
    backgroundColor: '#eee',
    padding: 8
  }
}

export default connect()(QuantityButton)