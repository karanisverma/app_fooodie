import React from 'react'
import { AsyncStorage, Platform, TouchableOpacity} from 'react-native'
import { View, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem } from 'native-base';
import { StackNavigator } from "react-navigation";
import * as userAction from '../../actions/userAction'
import { connect} from 'react-redux'
import Loader from '../../components/loader'
import { Amplitude } from 'expo';
import Sentry from 'sentry-expo';

// import { Permissions, Notifications } from 'expo';
import { getAuthToken, onSignOut, getUserEmail, getUserPhone} from '../../auth'


class UserProfile extends React.Component {

  // async registerForPushNotifications() {
  //   console.log('%c function getting called!!', 'font-size: 22px')
  //   const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

  //   if (status !== 'granted') {
  //     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //     if (status !== 'granted') {
  //       return;
  //     }
  //   }

  //   const token = await Notifications.getExpoPushTokenAsync();
  //   console.log("%c Calling calling calling!!!!!!", 'font-size: 25px')
  //   // this.subscription = Notifications.addListener(this.handleNotification);

  //   this.setState({
  //     token
  //   });
  //   console.log("Token=====>", token)
  // }

  state = {
    authToken: '',
    userEmail: '',
    userPhone: '',
    loginUser: '',
    loader: false
  };

  componentWillMount() {
    Amplitude.logEvent('page_user_profile');
    getAuthToken().then(res => {
      this.setState({
        authToken: res
      })
    })

    getUserEmail().then(email => {
      this.setState({
        userEmail: email
      })
    })

    getUserPhone().then(phone => {
      this.setState({
        userPhone: phone
      })
    })
    
  }

  userLogout = () => {
    this.setState({ loader: true })
    onSignOut().then(res => {
      this.props.dispatch(userAction.userLogout())
      this.setState({
        authToken: null,
        userEmail:'',
        userPhone:'',
        loader: false
      })
    })
  }

  // hiding default header of react navigation
  static navigationOptions = {
    header: null
  }

  render () {
    return (
      <Container>
        <Header style={styles.userContainer}>
          <Body style={styles.userInfo}>
            <Icon name='md-person'
              style={styles.userIcon}
            />
            {this.props.userInfo.email ? <Text>{this.props.userInfo.email}</Text>
              : <Text>User</Text>}
          </Body>
          <Right />
        </Header>
        <Content style={{backgroundColor: "white"}}>
          {this.state.loader ? <Loader /> : null}

          {!this.props.isLoggedIn ? <TouchableOpacity onPress={() => {
            Amplitude.logEvent('User moved to login screen');    
            this.props.navigation.navigate("Login", { title: "Login" })}}>
            <View style={styles.userRow}>
              <Icon name='md-log-in'
                style={styles.userInfoIcon}
              />
              <Text>Login</Text>
            </View>
          </TouchableOpacity>
            : null}

          {!this.props.isLoggedIn ? <TouchableOpacity onPress={() => {
            Amplitude.logEvent('User moved to Signup screen');  
            this.props.navigation.navigate("Signup", { title: "Signup" })
            }}>
            <View style={styles.userRow}>
              <Icon name='md-log-in'
                style={styles.userInfoIcon}
              />
              <Text>Signup</Text>
            </View>
          </TouchableOpacity>
            : null}

          {this.props.isLoggedIn ? <TouchableOpacity onPress={() => {
            Amplitude.logEvent('User moved to Past Order screen');              
            this.props.navigation.navigate("PastOrders", { title: "Past Orders" })
            }} >
            <View style={styles.userRow}>
              <Icon name='md-list'
                style={styles.userInfoIcon}
              />
              <Text>Past Orders</Text>
            </View>
          </TouchableOpacity>
            : null}

          {this.props.isLoggedIn ? <TouchableOpacity onPress={() => {
            Amplitude.logEvent('User moved to User Setting screen');                        
            this.props.navigation.navigate("SettingsPage", { title: 'Account' })
            }}>
            <View style={styles.userRow}>
              <Icon name='ios-settings'
                style={styles.userInfoIcon}
              />
              <Text>Settings</Text>
            </View>
          </TouchableOpacity>
            : null}

          <TouchableOpacity 
            onPress={() => {
              Amplitude.logEvent('User moved to How it works screen');
              this.props.navigation.navigate("HowItWorks", { title: 'How It Works' })
              }}>
          <View style={styles.userRow}>
            <Icon name='md-help-circle'
              style={styles.userInfoIcon}
            />
            <Text>How It Works</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Amplitude.logEvent('User moved to Help and Support screen');
              this.props.navigation.navigate("HelpSupport", { title: 'Help & Support' })
              }}>
          <View style={styles.userRow}>
            <Icon name='md-help-buoy'
              style={styles.userInfoIcon}
            />
            <Text>Help and Support</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => {
              Amplitude.logEvent('User moved to Privacy Policy');
              this.props.navigation.navigate("PrivacyPolicy", { title: 'Privacy Policy' })}}>
          <View style={styles.userRow}>
            <Icon name='md-lock'
              style={styles.userInfoIcon}
            />
            <Text>Privacy Policy</Text>
          </View>
          </TouchableOpacity>
          
          {this.props.isLoggedIn ? <TouchableOpacity onPress={() =>{
            Amplitude.logEvent('User loggedout');
            this.userLogout()}}>
          <View style={styles.userRow}>
            <Icon name='md-log-out'
              style={styles.userInfoIcon}
            />
            <Text>
              Logout
            </Text>
          </View>
          </TouchableOpacity>
          : null}    

          {/* <TouchableOpacity onPress={() => this.props.navigation.navigate("OrderTrackPage", { title: "Order Status" })} >
            <View style={styles.userRow}>
              <Icon name='md-log-out'
                style={styles.userInfoIcon}
              />
              <Text>Order Track Page</Text>
            </View>
          </TouchableOpacity> */}

          {/* <View style={styles.userRow}>
            <Icon name='md-log-out'
              style={styles.userInfoIcon}
            />
            <Text
              onPress={() => this.registerForPushNotifications()} >
              Push Notify
            </Text>
          </View> */}

        </Content>
      </Container>
    )
  }
}

const styles = {
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  userRow: {
    flexDirection: 'row',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  userIcon: {
    fontSize: 20,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 15,
    width: 30,
    height: 30,
    paddingLeft: 7,
    paddingTop: 4
  },
  userInfoIcon: {
    fontSize: 20,
    marginRight: 8,
    color: "#666"
  },
  userContainer: {
    ...Platform.select({
      ios: {
        paddingTop: 15,
      },
      android: {
        paddingTop: 25,
        paddingBottom: 25
      }
    })
  }
}

const mapStateToProps = state => ({
  userInfo: state.user.info,
  isLoggedIn: state.user.isLoggedIn
})

export default connect(mapStateToProps)(UserProfile)
