import { API } from '../env'
import * as Fetch from '../helpers/fetch';
import {stackNavigator} from 'react-navigation'
import {onSignIn} from '../auth';
import Sentry from 'sentry-expo';

export const INVALIDATE_USER = 'USER_INVALIDATE';
export const USER_REGISTER = 'USER_REGISTER';
export const USER_LOGIN = 'USER_LOGIN';
export const ERROR = 'USER_ERROR';
export const ADD_ADDRESS = 'ADD_ADDRESS';
export const SELECT_ADDRESS = 'SELECT_ADDRESS';
export const USER_LOGOUT = 'USER_LOGOUT';
export const PAST_ORDERS = 'PAST_ORDERS'
export const CANCEL_ORDER = 'CANCEL_ORDER'

export const userLogout = () => ({
  type: USER_LOGOUT
})
export const invalidateUser = () => ({
  type: INVALIDATE_USER
})
export const addAddress = info => ({
  type: ADD_ADDRESS,
  payload:{info}
})
export const selectAddress = info => ({
  type: SELECT_ADDRESS,
  payload:{info}
})
export const userRegister = info => ({
  type: USER_REGISTER,
  payload: {info}
})

export const userLogin = info => ({
  type: USER_LOGIN,
  payload: {info}
})

export const cancelOrder = info => ({
  type: CANCEL_ORDER,
  payload: {info}
})

export const userError = () => ({
  type: ERROR
})

export const pastOrder = info => ({
  type: PAST_ORDERS,
  payload: {info}
})

export function registerUser(email, phone, password) {
  return dispatch => {
    return fetch(`${API}/user/register/`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        phone,
        password
      })
    }).then(res => res.json())
      .then(res => {
        // console.log('Signup Resposne for user action', res)
        dispatch(userRegister(res));
        return res;
      })
      .catch(error => {
        Sentry.captureException(new Error('API: User Register call', error));
        console.error('Error message===>', error);
      })
  }
}

export function loginUser(phone, password) {
  // console.log('action paswoord===>', password)
  return dispatch => {
    return fetch(`${API}/user/login/`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          phone,
          password
        })
      }).then(res => res.json())
      .then(res => {
        // dispatch(userLogin(res));
        return res;
      })
      .catch(error => {
        Sentry.captureException(new Error('API: User Login Error', error));
        console.error('Login Error message===>', error);
      })

  }
}

export function saveAddress(phoneNumber, key, addressDetails){
  return dispatch => {
    return fetch(`${API}/location/add/`, {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `ApiKey ${phoneNumber}:${key}`
      },
        method: 'POST',
        body: JSON.stringify({
          'userAddress':addressDetails
        })
      }).then(res => res.json())
      .then(res => {
        return res;
      })
      .catch(error => {
        Sentry.captureException(new Error('API: Address call Error', error));
        console.error('Error while adding address at saveAddrss action===>', error);
      })
  }
}

export function getOtp(userEmail) {
  return dispatch => {
    return fetch(`${API}/user/request_password_reset?email=${userEmail}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(res => {
      return res
    })
    .catch(error => {
      Sentry.captureException(new Error('API: Reset API call error', error));
      console.log('getOtp ==>', error);
    })
  }
}

export function resetPassword(email, token, password) {
  return dispatch => {
    return fetch(`${API}/user/reset_password/`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        token,
        password
      })
    }).then(res => res.json())
      .then(res => {
        return res
      })
      .catch(error => {
        Sentry.captureException(new Error('API: Reset Password Call Error', error));
        console.error('error reset password==>', error);
      })
  }
}

export function pastOrders(phoneNumber, key) {
  return dispatch => {
    return fetch(`${API}/order/list/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `ApiKey ${phoneNumber}:${key}`
      }
    })
    .then(res => res.json())
    .then(res => {
      dispatch(pastOrder(res));
      return res
    })
    .catch(error => {
      Sentry.captureException(new Error('API: Order List call Error', error));
      console.log('error pastOrders==>', error)
    })
  }
}

export function orderCancel(phoneNumber, key, orderID) {
  return dispatch => {
    return fetch(`${API}/order/cancel/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `ApiKey ${phoneNumber}:${key}`
      },
      method: 'POST',
      body: JSON.stringify({
        orderID
      })
    })
    .then(res => res.json())
    .then(res => {
      dispatch(cancelOrder(res));
      return res;
    })
    .catch(error => {
      Sentry.captureException(new Error('API: Order Cancle Call Error', error));
      console.error('error cancel orders=>>>>>', error)
    })
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}