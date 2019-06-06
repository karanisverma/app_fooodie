import React from 'react'
import { Image, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import {stackNavigator} from 'react-navigation'
import { Container, Header, Content, Form, Item, Input, Label, View, Text, Button, Icon } from 'native-base';
import * as userAction from '../../actions/userAction'
import {connect} from 'react-redux'
import { onSignIn } from '../../auth';
import Loader from '../../components/loader'
import { Amplitude } from 'expo';
import Sentry from 'sentry-expo';
class Signup extends React.Component {

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
    phone: '',
    password: '',
    hiddenPassword: true,
    loader: false
  }
  validateEmail = (email) => {
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/
    return emailReg.test(email)
  }
  handleRegister = () => {
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
      return
    }
    this.props.dispatch(userAction.registerUser(this.state.email, this.state.phone, this.state.password))
    .then(res => {
      if (res.success) {
        this.setState({
          loader: true
        })
        onSignIn(res).then(() => {
          return dispatch(userAction.userRegister(res.user));
        })
        if (this.props.isCheckoutFlow) {
          this.props.navigation.replace('CartPage', {title: "Cart"})
        } else {
          this.props.navigation.goBack()
        }
        
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
    }).catch(error => {
      Sentry.captureException(new Error('API: Register User', error));                            
      console.error('&&&&&& catch  errorrororoor ====>>>>', error)
    })
  }

  componentWillMount() {
    Amplitude.logEvent('page_signup');
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-10} style={styles.loginWrapper}>
        {this.state.loader ? <Loader /> : null}
        <View style={{ position: 'relative' }}>
          <Image source={require('../../assets/img/login/login_screen_image.png')} style={{ width: '100%', height: 210, marginBottom: 70 }} resizeMode="cover" />

          <View style={styles.logoWrapper}>
            <Image source={require('../../assets/img/logo.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.logoText}>FOOODIE</Text>
          </View>
        </View>
        {/* <KeyboardAvoidingView behavior="padding" > */}
        <View style={styles.formStyle}>
          <Form>
            <Item floatingLabel  style={{ marginLeft: 0 }}>
              <Label style={styles.floatingLable}>Email Id</Label>
              <Input 
                textContentType="emailAddress"
                keyboardType="email-address"
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
                autoCapitalize="none"
                returnKeyType={"next"}
                onSubmitEditing={(event) => this._phone._root.focus()}
                />
            </Item>
            <Item floatingLabel  style={{ marginLeft: 0 }}>
              <Label style={styles.floatingLable}>Phone Number</Label>
              <Input 
              getRef={(c) => this._phone = c}
              keyboardType="numeric"
              onChangeText = {(phone) => this.setState({phone})}
              value={this.state.phone}
              returnKeyType="next"
              maxLength = {10}
              onSubmitEditing={(event) => this._password._root.focus()}
              />
            </Item>
            <Item floatingLabel style={{ marginLeft: 0 }}>
              <Label style={styles.floatingLable}>Password</Label>
              <Input 
                getRef={(c) => this._password = c}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                autoCapitalize="none"
                secureTextEntry={this.state.hiddenPassword}
                returnKeyType="go"
                onSubmitEditing={this.handleRegister}
              />
              {this.state.hiddenPassword ? <Icon name='ios-eye-off' 
                onPress={() => this.setState({ hiddenPassword: !this.state.hiddenPassword })}
              /> 
              : <Icon name='ios-eye' 
                  onPress={() => this.setState({ hiddenPassword: !this.state.hiddenPassword })}
                />
              }
            </Item>
            <Button style={styles.Button} onPress={this.handleRegister.bind(this)}>
              <Text style={styles.buttonText}>Signup</Text>
            </Button>
          </Form>
        </View>
       
        <View style={styles.loginRegisterWrapper}>
          <Text style={styles.noAccount}>Already have an account? </Text>
          {/* onPress={() => this.props.naviagtion.navigate("Login", { title: "Login" })}> */}
          <Text style={styles.registerHere}
            onPress={() => {
              Amplitude.logEvent('User moved to Login Screen');                  
              this.props.navigation.replace("Login", { title: "Login" })}}>
           Login Here!</Text>
        </View>

          <View style={{ height: 45 }} />
        </KeyboardAvoidingView>
      </ScrollView>      
    )
  }
}

const styles = {
  floatingLable:{
    paddingTop: 4
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
    fontWeight: 'bold'
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

const mapStateToProps = state => ({
  newUserInfo: state.user.info,
  isCheckoutFlow: state.productInfo.isCheckoutFlow
})

export default connect(mapStateToProps)(Signup)