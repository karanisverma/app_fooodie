import React from 'react'
import { Platform, TouchableOpacity} from 'react-native'
import { View, Container, Header, Content, ListItem, Text, Radio, Right, Left, Button, Footer, FooterTab } from 'native-base'
import { connect } from 'react-redux'
import { placeOrder, fetchProductSuccess, emptyCart } from '../../actions/productAction'
import Loader from '../../components/loader'
import { Amplitude } from 'expo';
import Sentry from 'sentry-expo';
class PaymentPage extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: (navigation.state.params && navigation.state.params.hideTabBar) === true,
    animationEnabled: true,
    title: `${navigation.state.params.title}`,
    headerForceInset: Platform.OS === 'android' ? { top: 'never', bottom: 'never' } : null,
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: 'white',
    },
  });

  state = {
    orderDetail: {},
    loader: false
  }

  componentWillMount() {
    Amplitude.logEvent('page_paymnet');
  }

  getOrderDetails = () => {
    this.state.orderDetail = this.props.products.filter((product) => (product.quantity > 0)).map((product) => {
      var orderDetail = {}
      orderDetail[product.product_id] = product.quantity
      return orderDetail
    })
    this.state.orderDetail = this.state.orderDetail.reduce(function (acc, order) {
      return { ...acc, ...order }
    }, {})
  }

  render() {
    this.getOrderDetails()
    return (
      <Container style={{backgroundColor: 'white'}}>
        {this.state.loader? <Loader /> : null}
        <Content style={{position: 'relative'}}>
          <ListItem selected={true} style={styles.listType}>
            <Left>
              <Text style={styles.cod}>Cash on Delivery</Text>
            </Left>
            <Right>
              <Radio
                color={"#f0ad4e"}
                selectedColor={"#5cb85c"}
                selected={true}
              />
            </Right>
          </ListItem>
        </Content>
        <Footer>
          <FooterTab style={{backgroundColor: 'skyblue'}}>
              <Button full
              style={styles.saveButton}
              onPress={() => {
                this.setState({
                  loader: true
                })
                Amplitude.logEvent('User has placed an order');
                this.props.dispatch(placeOrder(
                  this.props.userInfo.phone,
                  this.props.userInfo.key,
                  this.state.orderDetail,
                  this.props.userInfo.selectedAddress.id,
                  this.props.navigation.getParam('contactNumber')
                )).then(res => {
                  if (res.order_id) {
                    this.props.dispatch(emptyCart(this.props.products));
                    this.props.navigation.replace("OrderSuccessPage")
                    Amplitude.logEvent('User order have been sucessful');
                  } else {
                    this.setState({
                      loader: false
                    })
                    Amplitude.logEvent('User order has failed');
                    this.props.navigation.replace("OrderFailuerPage", { title: "Something went wrong." })
                  }
                }).catch(error => {
                  Sentry.captureException(new Error('API: Order Placement Error', error));                                        
                  this.props.navigation.replace("OrderFailuerPage", { title: "Something went wrong." })
                  this.setState({
                    loader: false
                  })
                })
              }}
              >
                <Text style={styles.placeOrder}>Place Order by COD</Text>
              </Button>            
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const styles = {
  cod: {
    color:"#393018"
  },
  listType: {
    backgroundColor: 'white',
    marginLeft: 0,
    paddingLeft: 16
  },
  saveButton: {
    backgroundColor: '#f17f20'
  },
  placeOrder: {
    color: '#f5f5f5',
    fontWeight: '500',
    fontSize: 16
  }
}

const mapStateToProps = state => ({
  userInfo: state.user.info,
  products: state.productInfo.products
})

export default connect(mapStateToProps)(PaymentPage)