import React from 'react'
import { Image, TouchableOpacity, Alert, AsyncStorage, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native'
import {stackNavigator} from 'react-navigation'
import { Container, Header, Content, Form, Item, Input, Label, View, Text, Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/userAction'
import {onSignIn} from '../../auth';
import * as userAction from '../../actions/userAction'
import Loader from '../../components/loader'
import { Amplitude } from 'expo';
import Sentry from 'sentry-expo';

class Login extends React.Component {

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
    phone: '',
    password: '',
    authToken: '',
    hiddenPassword: true,
    loader: false
  }

  componentWillMount() {
    Amplitude.logEvent('page_login');
  }

  handleLogin = () => {
    const {dispatch} = this.props

    dispatch(userAction.loginUser(this.state.phone, this.state.password)).then(res => {
      if (res.success) {
        this.setState({
          loader: true
        })
        onSignIn(res).then(() => {
          return dispatch(userAction.userLogin(res.user));
        }).then(() =>{
          if (this.props.isCheckoutFlow) {
            Amplitude.logEvent('User Login from cart page');    
            this.props.navigation.replace('CartPage', {title: "Cart"})
          } else {
            Amplitude.logEvent('User Login from setting page');
            this.props.navigation.goBack()
          }
        })
      } else {
        Alert.alert(
          `Username or Password is incorrect.`,
          '', [{
              text: 'OK',
              onPress: () =>{
                Amplitude.logEvent('User entered wrong email/password');            
              }
            },
          ], {
            cancelable: false
          }
        )
      }
      }).catch(error => {
        Sentry.captureException(new Error('API: Login Error', error));              
        console.error('**** Login error ******** ====>>>>', error)
      })
  }

  render () {
    return (
      
      // <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <ScrollView style={{backgroundColor: 'white'}}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-10} style={styles.loginWrapper}>
      
      {this.state.loader ? <Loader /> : null}
      <View style={{position: 'relative'}}>
          <Image source={require('../../assets/img/login/login_screen_image.png')} style={{ width: '100%', height: 210, marginBottom: 100}} resizeMode="cover" />
        
        <View style={styles.logoWrapper}>
          <Image source={require('../../assets/img/logo.png')} style={styles.logo} resizeMode="contain"/>
          <Text style={styles.logoText}>FOOODIE</Text>
        </View>
      </View>
        
        <View style={styles.formStyle}>
          <Text style={styles.loginTitle}>Login to order tasty food today!</Text>
          
          <Form>
            <Item floatingLabel style={{ marginLeft: 0 }}>
              <Label style={styles.floatingLable}>Mobile Number</Label>
              <Input 
              onChangeText = {(phone) => this.setState({phone})}
              value = {this.state.phone}
              autoCapitalize="none"
              keyboardType='numeric'
              returnKeyType={"next"}
              maxLength = {10}
              onSubmitEditing={(event) => this._password._root.focus()}
              />
            </Item>
            <Item floatingLabel style={{ marginLeft: 0 }}>
              <Label style={styles.floatingLable}>Password</Label>
              <Input 
              getRef={(c) => this._password = c}
              onChangeText = {(password) => this.setState({password})}
              value={this.state.password}
              autoCapitalize="none"
              returnKeyType={"done"}
              secureTextEntry={this.state.hiddenPassword}
              onSubmitEditing = {this.handleLogin}
              />

              {this.state.hiddenPassword ? <Icon name='ios-eye-off' 
                onPress={() => {            
                  this.setState({ hiddenPassword: !this.state.hiddenPassword });
                  Amplitude.logEvent('User checked for Password');
              }}
              /> 
              : <Icon name='ios-eye' 
                  onPress={() => this.setState({ hiddenPassword: !this.state.hiddenPassword })}
                />
              }
              
            </Item>
            <TouchableOpacity>
              <Button style={styles.Button}
                onPress={this.handleLogin.bind(this)}>
                <Text style={styles.buttonText}>
                  LOGIN
                </Text>
              </Button>
            </TouchableOpacity>
          </Form>
        </View>

        <View>
          <Text style={styles.forgotPassword}
            onPress={() => {
              Amplitude.logEvent('User moved to forgot password');
              this.props.navigation.navigate("ForgotPasswordPage", {title: "Reset Password"})
          }}
          >Forgot Password?</Text>
        </View>

        <View style={styles.loginRegisterWrapper}>
          <Text style={styles.noAccount}>Don't have an account?</Text>
          <Text style={styles.registerHere}
            onPress={() => {
              Amplitude.logEvent('User moved to Signup page');
              this.props.navigation.navigate("Signup", { title: "Signup" })
          }}
          > Register Here!</Text>
        </View>
        <View style={{ height: 45 }} />
      </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const styles = {
  floatingLable:{
    paddingTop:4
  },
  loginWrapper : {
    backgroundColor: 'white',
    flex: 1,
    position: 'relative'
  },
  logoWrapper: {
    position: 'absolute',
    alignSelf: 'center',
    top: '45%',
    backgroundColor: 'white',
    borderRadius:100
  },
  logo: {
    width: 125,
    height: 125
  },
  logoText: {
    alignSelf: 'center',
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  formStyle: {
    paddingLeft: 30,
    paddingRight: 30
  },
  loginTitle: {
    textAlign: 'center'
  },
  Button: {
    alignSelf: 'center',
    backgroundColor: '#f17f20',
    marginTop: 15,
    marginBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 0
  },
  buttonText: {
    fontSize: 18,
    letterSpacing: 1,
    color: '#f5f5f5',
    fontWeight: 'bold'
  },
  forgotPassword: {
    color: '#f17f20',
    fontSize: 12,
    alignSelf: 'center'
  },
  loginRegisterWrapper: {
    alignSelf: 'center',
    flexDirection: 'row',
    paddingTop: 10
  },
  noAccount: {
    fontSize: 12,
    color: '#aeaeae'
  },
  registerHere: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'black'
  }
}

const mapStateToProps = state => ({
  isCheckoutFlow: state.productInfo.isCheckoutFlow
})

export default connect(mapStateToProps)(Login)