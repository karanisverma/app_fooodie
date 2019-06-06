import React from 'react'
import { Platform, Image, TouchableOpacity, KeyboardAvoidingView, Animated, TouchableHighlight, Alert, StyleSheet } from 'react-native'
import {stackNavigator} from 'react-navigation'
import { Container, Header, Content, Form, Item, Input, Label, View, Text, Button, Picker, Toast } from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import {connect} from 'react-redux'
import { MapView, Location, Permissions, IntentLauncherAndroid, Amplitude } from 'expo';
import Geocoder from 'react-native-geocoding';
import { saveAddress, addAddress, selectAddress } from '../../actions/userAction'
import { onAddAddress } from '../../auth';
import Sentry from 'sentry-expo';
Geocoder.init('AIzaSyBDOkUCmZO-6ZkaJ8P8arO0Lw2HxR8tKnE');
class AddressSelector extends React.Component {

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
    isServiceable: false,
    serviceableCities: ['bhilai'],
    houseNumber: '',
    address: '',
    landmark: '',
    password: '',
    language: '',
    userLocation: '',

    // write a function to parse google 
    // api response for zip code/street/area
    // hardcoding for now.
    zipcode: '',
    street: '',
    area: '',
    city: 'bhilai',
    state: 'chhattisgarh',
    remainingAddress: '',
    region: {
      latitude: 21.1938,
      longitude:  81.3509,
      latitudeDelta: 0.0330922,
      longitudeDelta: 0.0330421,
    },
    coords: {
      latitude: 21.1938,
      longitude: 81.3509
    }
  }
  getLocationType = (address, type) => {
    return address.address_components.find(com => {
      return com.types.includes(type)
      })
  }
  handleRegionChangeComplete = (newRegion) => {
    this.setState({region: newRegion})
    this.setState({ coords: {
      latitude: newRegion.latitude,
      longitude: newRegion.longitude
    } })
    Geocoder.from(newRegion.latitude, newRegion.longitude)
		.then(json => {
      if (json.results.length > 0){
        let isServiceable = false
        let addrResult = json.results[0]
        let streetAddr = this.getLocationType(addrResult, 'street_address') || this.getLocationType(addrResult, 'route')
        let zipcode = this.getLocationType(addrResult, 'postal_code')
        let area = this.getLocationType(addrResult, 'sublocality_level_1') || this.getLocationType(addrResult, 'sublocality_level_2')
        let city = this.getLocationType(addrResult, 'locality') || this.getLocationType(addrResult, 'administrative_area_level_2')
        if (zipcode) {
          this.setState({zipcode: zipcode.long_name})
        }
        if(area) {
          this.setState({area: area.long_name})
        } 
        if (streetAddr) {
          this.setState({street:streetAddr.long_name})
        }

        if (city.long_name && this.state.serviceableCities.includes(city.long_name.toLowerCase())) {
          isServiceable = true
        } else {
          isServiceable = false
        }
        
        this.setState({isServiceable})
        const address = json.results[0].formatted_address
        const completeAddress = json.results[0].formatted_address;
        if(completeAddress.includes('Bhilai')){
          address = json.results[0].formatted_address.split('Bhilai')[0].slice(0,-1);
          this.setState({remainingAddress: json.results[0].formatted_address.split('Bhilai')[1]})
        } else {
          address = json.results[0].formatted_address
        }
        this.setState({address})
      } 
    })
    .catch(error => {
      console.error('Error ======>>>>', error)
      Sentry.captureException(new Error('API: Google Geocoder Error', error));
      throw error;
    })
  }
  
  componentDidMount() {
    // asks user current location as soon as screen loads
    this._getLocationAsync();
    }
    handleAddressSave = () => {
      if (!this.state.isServiceable)  {        
        Alert.alert(
          `Fooodie is not availabe at this location 😟`,
          `We are currently serving in ${this.state.serviceableCities.join(', ')}, please change your location on 🗾 map and try again 👍🏼.`, [{
            text: 'OK'
          },
          ], {
            cancelable: false
          }
        )
        Amplitude.logEvent('Unserviceble Alert');
        return
      }
      let {dispatch} = this.props
      let completeAddress = this.state.remainingAddress.length > 0 
                              ? 
                              `${this.state.address} Bhilai ${this.state.remainingAddress}`
                              :
                              this.state.address  
      let addressDetails = {
        "lat": this.state.coords.latitude,
        "long": this.state.coords.longitude,
        "street": this.state.street,
        "flatNumber": this.state.houseNumber,
        "area": this.state.area,
        "landmark": this.state.landmark,
        "googleMapFormattedAddr": completeAddress,
        "city": this.state.city,
        "state": this.state.state,
        "zipcode": this.state.zipcode
      }
      // adding address API CALL --> adding it in state ---> adding in async storage.
      dispatch(saveAddress(
          this.props.userInfo.phone,
          this.props.userInfo.key,
          addressDetails
        ))
        .then((res) => {
          dispatch(selectAddress(res.address))
          return dispatch(addAddress(res.address))
        })
        .then(() => (onAddAddress(this.props.userInfo)
        .then(() => this.props.navigation.goBack())
      ))
      Amplitude.logEvent('Save address');
    }
    // fetches users current location 
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    // if (status !== 'granted') {
    // }
    let locationStatus = await Location.getProviderStatusAsync()
    if(!locationStatus.locationServicesEnabled || !locationStatus.gpsAvailable) {
      Alert.alert(
        `Seems like your GPS is off. Please turn it on from Location settings.`,
        '', 
        [
          {
            text: 'Enter Manually',
            onPress: () =>{
              Amplitude.logEvent('Selecting Address Manullay');
            }
          },
          {
            text: 'Turn On GPS',
            onPress: () => {
              Amplitude.logEvent('GPS Enabled by user');
              IntentLauncherAndroid.startActivityAsync(
                IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
                );
            }
          }
        ]
      )
      Amplitude.logEvent('User GPS Request Fail');
    } else {
      let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
      this.setState({region: {
        ...this.state.region,
        latitude: location.coords.latitude,
        longitude:  location.coords.longitude,
        latitudeDelta: 0.0330922,
        longitudeDelta: 0.0330421
      }})
      Amplitude.logEvent('User GPS Request Success');
    }
    Amplitude.logEvent('User GPS Request');
    }  
    
  componentWillMount() {
    Amplitude.logEvent('page_address_selector');
  }
  render() {
    return (
      <View style={styles.loginWrapper}>
        <View style={{ flex: 1, position:'relative', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
          <MapView style={{flex: 1, width: '100%'}}
            region={this.state.region}
            onRegionChangeComplete = {(e) => this.handleRegionChangeComplete(e)}
          />  

          <View style={{position: 'absolute'}}>
            <Image 
            source={require('../../assets/img/icons/marker/marker4.png')} 
            style={{ width: 40, height: 40, marginTop: -60, marginLeft:0, zIndex:10}}
            />
          </View>
          {/* on press is not getting called */}
          <View style={{position: 'absolute', right: 25, bottom: 25}}>
            <TouchableOpacity
              style={styles.locateButton}
              onPress={() => this._getLocationAsync()}>
              <Ionicons name= "md-locate" size={20} color='#f17f20'/>
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardAvoidingView behavior="padding" >
        <View style={styles.formStyle}>
          <Form>
            <Item floatingLabel>
              <Label style={styles.floatingLable} style={styles.floatingLable}>House Number</Label>
              <Input 
                onChangeText={(houseNumber) => this.setState({houseNumber})}
                value={this.state.houseNumber}
                />
            </Item>
            <Item floatingLabel>
              <Label style={styles.floatingLable}>Landmark</Label>
              <Input 
              onChangeText = {(landmark) => this.setState({landmark})}
              value={this.state.landmark}
              />
            </Item>
            <Item floatingLabel>
              <Label style={styles.floatingLable}>Address</Label>
              <Input 
                onChangeText={(address) => this.setState({address})}
                value={this.state.address}
                />
            </Item>

            {this.state.landmark.length > 0 && this.state.houseNumber.length > 0 ? 
            <Button style={styles.Button} onPress={() => this.handleAddressSave()}>
              <Text style={styles.buttonText} >SAVE ADDRESS</Text>
            </Button>
            :            
            <Button style={styles.dullButton}
              onPress={() => {
                Amplitude.logEvent('Location save without House Number or landmark');
                return Toast.show({ 
                text: "House Number or Landmark is missing.",
                buttonText: "X",
                duration: 3000,
                position: "bottom",
                style: {
                  backgroundColor: "gray"
                }
              })
            }}>
              <Text style={styles.dullButtonText} >SAVE ADDRESS</Text>
            </Button>}
          </Form>
        </View>
        </KeyboardAvoidingView>
      </View>

    )
  }
}

const styles = {
  floatingLable:{
    paddingTop:4
  },
  locateButton: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android

    alignItems:'center',
    justifyContent:'center',
    width:40,
    height:40,
    backgroundColor:'#fff',
    borderRadius:30,
  },
  overlay:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
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
  dullButton: {
    alignSelf: 'center',
    backgroundColor: '#eee',
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
  dullButtonText: {
    fontSize: 18,
    letterSpacing: 1,
    color: '#393018',
    fontWeight: 'normal'
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
  userInfo: state.user.info
})

export default connect(mapStateToProps)(AddressSelector)