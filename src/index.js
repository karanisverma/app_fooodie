import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Amplitude } from 'expo';
// import { Permissions, Notifications } from 'expo';
import { View, Text, StyleSheet, NetInfo} from 'react-native'
import {Provider} from 'react-redux'
import Homepage from './pages/homepage'
import { combineReducers } from 'redux'
import reducers from './reducers'
import Router from './router'
import { AMPLITUDE_KEY} from './env'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { Root, StyleProvider } from "native-base";

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

import Sentry from 'sentry-expo';

// Remove this once Sentry is correctly setup.
Sentry.enableInExpoDevelopment = false;

Sentry.config('https://3b96f2cefefd46968a5ab4eb7c6a23a2@sentry.io/1281698').install();

const middleware = [ thunk ];

// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger());
// }
const store = createStore(
                    reducers, 
                    applyMiddleware(...middleware));
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isReady: false,
      isConnected: true
    };
  }

  handleConnectivityChange = isConnected => {
    console.log("is connected function====>", isConnected)
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected: false });
    }
  };

  componentWillMount() {
    Amplitude.initialize(AMPLITUDE_KEY);
    this.loadFonts();
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }
  
  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }
  
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Root>
        {!this.state.isConnected ? <View style={{flex: 1}}>
          <Text style={{backgroundColor: '#f17f20', padding: 20, textAlign: 'center', color: 'white', fontWeight: '600'}}>You are offline. Please check your connectivity</Text>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ textAlign: 'center', width: 135, alignSelf: 'center', padding: 10, color: '#f17f20', borderWidth: 4, borderColor: '#f17f20'}} onPress={() => Expo.Util.reload()}>RETRY</Text>
          </View>
        </View> 
        : <Provider store={store}>
          <React.Fragment>
            <StyleProvider style={getTheme()}>
              <Router />
            </StyleProvider>
          </React.Fragment>
        </Provider>
        }
        
      </Root>
    )
  }
}

export default App