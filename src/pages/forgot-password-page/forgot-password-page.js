import React from 'react'
import { Image, Platform, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { stackNavigator } from 'react-navigation'
import { Container, Header, Content, Form, Item, Input, Label, View, Text, Button, Icon } from 'native-base';
import { getOtp } from '../../actions/userAction'
import * as userAction from '../../actions/userAction'  
import {connect} from 'react-redux'
import Loader from '../../components/loader'
import { Amplitude } from 'expo';
import Sentry from 'sentry-expo';

class ForgotPasswordPage extends React.Component {

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
    email: '',
    token: '',
    password: '',
    reqOtp: false,
    hiddenPassword: true,
    loader: false
  }

  componentWillMount() {
    Amplitude.logEvent('page_forgot_password');
  }
  validateEmail = (email) => {
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/
    return emailReg.test(email)
  }
  handleOTP = () => {
    this.setState({
      loader: true
    })
    const { dispatch } = this.props
    let isValidEmail = this.validateEmail(this.state.email)
    if (!isValidEmail) {
      Alert.alert(
        `Email ID is invalid, Please check.`,
        '', [{
          text: 'OK'
        },
        ], {
          cancelable: false
        }
      )
      this.setState({
        loader: false
      })
      return
    }
    dispatch(userAction.getOtp(this.state.email)).then(res => {   
      if (res.success) { 
        Alert.alert(
          `OTP sent successfully! Please check your email.`,
          '', [{
            text: 'OK'
          },
          ], {
            cancelable: false
          }
        )
        this.setState({
          reqOtp: true,
          loader: false
        })
        Amplitude.logEvent('OTP sent successful');
      } else {
        this.setState({
          loader: false
        })
        Alert.alert(
          `${res.error}`,
          '', [{
            text: 'OK',
            onPress: () => this.setState({email: ''})
          },
          ], {
            cancelable: false
          }
        )
      }
    })
    .catch(error => {
      Sentry.captureException(new Error('API: Get Password OTP Error', error));
      console.error("error handleOTP page===>", error)
    })
    
  }

  handleResetPassword = () => {
    this.setState({
      loader: true
    })
    const { dispatch } = this.props
    dispatch(userAction.resetPassword(this.state.email, this.state.token, this.state.password)).then(res => {
      if (res.success) {
        this.setState({
          loader: false
        })
        Alert.alert(
          `Your password has been reset successfully, Please Login`,
          '', [{
            text: 'Login',
            onPress: () => this.props.navigation.goBack()
          },
          ], {
            cancelable: false
          }
        )
        Amplitude.logEvent('OTP reset successful');
      } else {
        this.setState({
          loader: false
        })
        Alert.alert(
          `${res.error}`,
          '', [{
            text: 'OK'
          },
          ], {
            cancelable: false
          }
        )
      }
    })
    .catch(error => {
      Sentry.captureException(new Error('API: Reset Password Error', error));      
      console.error("error resetPassword page===>", error)
    })
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-10} style={styles.loginWrapper}>
        {this.state.loader ? <Loader /> : null} 
        <View style={{ position: 'relative' }}>
          <Image source={require('../../assets/img/login/login_screen_image.png')} style={{ width: '100%', height: 210, marginBottom: 100 }} resizeMode="cover" />

          <View style={styles.logoWrapper}>
            <Image source={require('../../assets/img/logo.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.logoText}>FOOODIE</Text>
          </View>
        </View>
        {this.state.reqOtp === false ? <View style={styles.formStyle}>
          <Text style={styles.loginTitle}>Reset Password</Text>
          <Form>
            <Item floatingLabel style={{marginLeft: 0}}>
              <Label style={styles.floatingLable}>Email ID</Label>
              <Input
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
                autoCapitalize='none'
                autoFocus={true}
                returnKeyType={"done"}
                onSubmitEditing={this.handleOTP}
              />
            </Item>
            <Text style={{marginTop: 10, fontSize:14, color: '#aaa'}}>Please enter your registered email for OTP.</Text>
            <TouchableOpacity>
              <Button style={styles.Button}
                onPress={this.handleOTP}>
                <Text style={styles.buttonText}>SEND EMAIL</Text>
              </Button>
            </TouchableOpacity>
          </Form>
        </View> 
          : <View style={styles.formStyle}>
            <Form>
              <Item floatingLabel style={{ marginLeft: 0 }}>
                <Label style={styles.floatingLable}>OTP</Label>
                <Input
                  value={this.state.token}
                  onChangeText={(token) => this.setState({ token })}
                  autoCapitalize='none'
                  returnKeyType={"next"}
                  autoFocus={true}
                  onSubmitEditing={(event) => this._password._root.focus()}
                />
              </Item>

              <Item floatingLabel style={{ marginLeft: 0 }}>
                <Label style={styles.floatingLable}>New Password</Label>
                <Input
                  getRef={(c) => this._password = c}
                  value={this.state.password}
                  onChangeText={(password) => this.setState({ password })}
                  autoCapitalize='none'
                  returnKeyType={"done"}
                  secureTextEntry={this.state.hiddenPassword}
                  onSubmitEditing={this.handleResetPassword}
                />
                {this.state.hiddenPassword ? <Icon name='ios-eye-off' 
                onPress={() => this.setState({ hiddenPassword: !this.state.hiddenPassword })}
              /> 
              : <Icon name='ios-eye' 
                  onPress={() => this.setState({ hiddenPassword: !this.state.hiddenPassword })}
                />
              }
              </Item>
              <TouchableOpacity>
              <Button style={styles.Button}
               onPress={this.handleResetPassword}>
                <Text style={styles.buttonText}>RESET PASSWORD</Text>
              </Button>
              </TouchableOpacity>
            </Form>
          </View>
        }  
          <View style={{ height: 65 }} />
        </KeyboardAvoidingView>
      </ScrollView>      
    )
  }
}

const styles = {
  floatingLable:{
    paddingTop:4
  },
  loginWrapper: {
    backgroundColor: 'white',
    flex: 1,
    position: 'relative'
  },
  logoWrapper: {
    position: 'absolute',
    alignSelf: 'center',
    top: '45%',
    backgroundColor: 'white',
    borderRadius: 100
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
    fontWeight: 'bold'
  },
  Button: {
    alignSelf: 'center',
    backgroundColor: '#f17f20',
    marginTop: 35,
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
    color: '#aeaeae',
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

export default connect()(ForgotPasswordPage)