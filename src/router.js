import React from 'react';
import {
  Platform,
} from 'react-native';
// import { StackNavigator } from 'react-navigation'

import HelpSupport from "./pages/help-support";
import HowItWorks from '../src/pages/how-it-works'
import PrivacyPolicy from '../src/pages/privacy-policy'
import SettingsPage from '../src/pages/settings-page'
import Login from '../src/pages/login'
import Signup from '../src/pages/signup'
import ForgotPasswordPage from '../src/pages/forgot-password-page'
import CartPage from '../src/pages/cart-page'
import OrderSuccessPage from '../src/pages/order-success-page'
import OrderFailuerPage from '../src/pages/order-failure-page'
import OrderTrackPage from '../src/pages/order-track-page'
import AddressSelector from '../src/pages/address-selector'
import Homepage from '../src/pages/homepage'
import UserProfile from '../src/pages/user-profile'
import Menu from '../src/pages/menu'
import PaymentPage from '../src/pages/payment-page'
import FooterNavigation from '../src/components/footerNavigation'
import Loader from '../src/components/loader'
import PastOrders from '../src/pages/past-orders'
import OrderDetails from '../src/pages/order-details'
import { StackNavigator } from "react-navigation";

// export default (DrawNav = StackNavigator({
const Router =  StackNavigator({
  Homepage: { screen: Homepage },
  UserProfile: { screen: UserProfile },
  HelpSupport: { screen: HelpSupport },
  PrivacyPolicy: { screen: PrivacyPolicy },
  HowItWorks: { screen: HowItWorks },
  SettingsPage: { screen: SettingsPage },
  Menu: { screen: Menu },
  Login: { screen: Login },
  Signup: { screen: Signup },
  ForgotPasswordPage: { screen: ForgotPasswordPage },
  CartPage: { screen: CartPage },
  OrderSuccessPage: { screen: OrderSuccessPage },
  OrderFailuerPage: { screen: OrderFailuerPage },
  OrderTrackPage: { screen: OrderTrackPage },
  PaymentPage: { screen: PaymentPage },
  Loader: { screen: Loader},
  PastOrders: {screen: PastOrders},
  OrderDetails: {screen: OrderDetails},
  FooterNavigation: { screen: FooterNavigation},
  
  AddressSelector: { screen: AddressSelector }
},
  {
    initialRouteName: "FooterNavigation"
  }
);


export default Router