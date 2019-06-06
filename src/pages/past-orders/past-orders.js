import React from 'react'
import { Platform, TouchableOpacity, Button } from 'react-native'
import { Container, Header, View, Tab, Tabs, TabHeading, Icon, Text, Content, ListItem, List} from 'native-base'
import {connect} from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { pastOrders } from '../../actions/userAction'
import { format } from 'date-fns';
import Loader from '../../components/loader'
import { Amplitude } from 'expo';
import Sentry from 'sentry-expo';
class PastOrders extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: (navigation.state.params && navigation.state.params.hideTabBar) === true,
    animationEnabled: true,
    title: `${navigation.state.params.title}`,
    headerForceInset: Platform.OS === 'android' ? { top: 'never', bottom: 'never' } : null,
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerLeft: <Ionicons name={Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'}
      size={30}
      onPress={() => { 
        Amplitude.logEvent('User Refresh Order status from Header Icon');
        navigation.navigate('FooterNavigation');
        }}
      style={{ paddingLeft: 20, color: '#6961CC'}}
      />,
    headerRight: <Ionicons name={Platform.OS === 'android' ? 'md-refresh' : 'ios-refresh'}
      size={30}
      onPress={() => { navigation.replace("PastOrders", { title: "Past Orders", activePage: 1  }) }}
      style={{ paddingRight: 20, color: '#6961CC' }}
    />,
    headerStyle: {
      backgroundColor: 'white',
    },
  });

  state = {
    initialPage: 0,
    loader: true
  }

  componentDidMount() {
    this.props.dispatch(pastOrders(
      this.props.userInfo.phone,
      this.props.userInfo.key
    ))
    .then (res => {
      this.setState({
        loader: false
      })
    })
  }

  componentWillMount() {
    Amplitude.logEvent('page_past_orders');
  }

  getFormattedTime(date) {
    let dateForm = new Date(date + 'Z')
    let dateFormat = format(dateForm, 'h:ma, DD/MM')
    return `${dateFormat}`
  }
  
  render() {
    return (
      <Container style={{backgroundColor: 'white'}}>
        <Content>
          {this.state.loader ? <Loader /> : null}
        <Tabs initialPage={this.state.initialPage} page={this.props.navigation.getParam('activePage', 0)}>
          <Tab heading={<TabHeading><Text>Past Orders</Text></TabHeading>}>
            <List>
              {this.props.userInfo.orders ? this.props.userInfo.orders.length > 0 ? this.props.userInfo.orders.map((item,index) => 
                  item.status === 'Delivered' || item.status === 'Cancelled' || item.status === 'Rejected' || item.status === 'Success' ? <ListItem style={styles.wrapper} key={index}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("OrderDetails", {orderId: item.order_id})}
                    style={{ width: '100%' }}>
                    <View style={styles.delieveredWrapper}>
                      <Text styel={{ fontWeight: 'bold' }}>#{item.order_id}</Text>
                      <Text style={(item.status === 'Delivered') ? styles.delivered : (item.status === 'Cancelled') ? styles.cancelled : styles.rejected}>{item.status}</Text>
                    </View>

                    <View style={styles.dateWrapper}>
                        <Text>{this.getFormattedTime(item.time)}</Text>
                      <Text style={{ flex: 1, textAlign: 'right' }}>₹{item.paidamount + item.delivery_charge} ></Text>
                    </View>
                  </TouchableOpacity>
                </ListItem>
                : null      
                )
              : <Text style={{textAlign: 'center', paddingTop: 20}}>There is no order yet!</Text>      
              : null
              }
            </List>
          </Tab>

          <Tab heading={<TabHeading><Text>Upcoming</Text></TabHeading>}>
              {this.props.userInfo.orders 
                && this.props.userInfo.orders.length > 0 
                && this.props.userInfo.orders.some(item => (item.status == 'Pending' || item.status == 'Accepted'))
                ? <TouchableOpacity
                  onPress={() => { 
                    Amplitude.logEvent('User Refresh Order status from List View');    
                    this.props.navigation.replace("PastOrders", { title: "Past Orders", activePage: 1 }) }}
                  style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', backgroundColor: '#1291D1', paddingBottom: 5 }} >
                  <Text
                    style={{ paddingLeft: 15, alignSelf: 'center', paddingTop: 10, paddingBottom: 5, fontWeight: '600', color: 'white' }}>
                    Please refresh for current status
                    </Text>
                  <Ionicons name={Platform.OS === 'android' ? 'md-refresh' : 'ios-refresh'}
                    size={24}
                    style={{ paddingLeft: 5, paddingRight: 15, paddingTop: 8, color: 'white' }}
                    onPress={() => { this.props.navigation.replace("PastOrders", { title: "Past Orders", activePage: 1 }) }} />
                </TouchableOpacity>
                : null
              }

            <List>
              {this.props.userInfo.orders && this.props.userInfo.orders.length > 0 ? this.props.userInfo.orders.map((item,index) => 
                item.status === 'Pending' || item.status === 'Accepted' ? <ListItem style={styles.wrapper} key={index}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("OrderDetails", {orderId: item.order_id})}
                    style={{ width: '100%' }}>
                    <View style={styles.delieveredWrapper}>
                      <Text style={{ fontWeight: 'bold' }}>#{item.order_id}</Text>
                      <Text style={(item.status === 'Pending') ? styles.pending : styles.accepted}>{item.status}</Text>
                    </View>

                    <View style={styles.dateWrapper}>
                      {/* <Text style={{ flex: 3 }}>{format(item.time, 'DD/MM/YYYY h:ma')} | {item.order.length} item</Text> */}
                        <Text>{this.getFormattedTime(item.time)}</Text>
                        <Text style={{ flex: 1, textAlign: 'right' }}>{item.paidamount + item.delivery_charge} ></Text>
                    </View>
                  </TouchableOpacity>
                </ListItem>
                : null                
                )
              : <Text style={{textAlign: 'center', paddingTop: 20}}>There is no order yet!</Text>
              }
            </List>
          </Tab> 
           
        </Tabs>
        </Content>
      </Container>
    )
  }
}

const styles = {
  wrapper: {
    flexDirection: 'column',
    marginLeft: 0,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%'
  },
  delivered: {
    fontSize: 12,
    backgroundColor: 'green',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'white',
    marginLeft: 10
  },
  accepted: {
    fontSize: 12,
    backgroundColor: '#EB8A34',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'white',
    marginLeft: 10
  },
  cancelled: {
    fontSize: 12,
    backgroundColor: '#E64655',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'white',
    marginLeft: 10
  }, 
  pending: {
    fontSize: 12,
    backgroundColor: '#2056B8',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'white',
    marginLeft: 10
  },
  rejected: {
    fontSize: 12,
    backgroundColor: '#B58A60',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'white',
    marginLeft: 10
  },
  delieveredWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7
  },
  dateWrapper: {
    flexDirection: 'row'
  }
}

const mapStateToProps = state => ({
  userInfo: state.user.info
})

export default connect(mapStateToProps)(PastOrders)