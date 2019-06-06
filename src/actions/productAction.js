import { API } from '../env'
import * as Fetch from '../helpers/fetch';
import { getAuthToken, getUserPhone } from '../auth'

export const FETCH_PRODUCTS_LIST_BEGIN = 'FETCH_PRODUCTS_LIST_BEGIN';
export const FETCH_PRODUCTS_LIST_SUCCESS = 'FETCH_PRODUCTS_LIST_SUCCESS';
export const FETCH_PRODUCTS_LIST_FAILURE = 'FETCH_PRODUCTS_LIST_FAILURE';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const PLACE_ORDER = 'PLACE_ORDER';
export const ORDER_PLACEMENT_BEGIN = 'ORDER_PLACEMENT_BEGIN';
export const ORDER_PLACEMENT_SUCCESS = 'ORDER_PLACEMENT_SUCCESS';
export const CHECKOUT_FLOW = 'CHECKOUT_FLOW';
export const LATEST_ORDER_DETAILS = 'LATEST_ORDER_DETAILS';
export const EMPTY_CART = 'EMPTY_CART';
export const SOLD_OUT = 'SOLD_OUT';
export const OOS_PRODUCTS = 'OOS_PRODUCTS'
export const DELETE_FROM_CART = 'DELETE_FROM_CART'

import Sentry from 'sentry-expo';

export const checkoutFlow = () => ({
  type: CHECKOUT_FLOW
})
export const soldOut = () => ({
  type: SOLD_OUT
})

export const fetchOutOfStockProductSuccess = (oosProducts) => ({
  type: OOS_PRODUCTS,
  payload: oosProducts
})
export const deleteFromCart = (oosProductIds) => ({
  type: DELETE_FROM_CART,
  payload: {oosProductIds}
})

export const emptyCart = (products) => ({
  type: EMPTY_CART,
  payload: {objects: products}
})
export const fetchProductListBegin = () => ({
  type: FETCH_PRODUCTS_LIST_BEGIN
})
export const fetchProductSuccess = products => ({
  type: FETCH_PRODUCTS_LIST_SUCCESS,
  payload: products
})

export const orderPlacementBegin = () => ({
  type: ORDER_PLACEMENT_BEGIN
})
export const orderPlacementSuccess = orderDetails => ({
  type: ORDER_PLACEMENT_SUCCESS,
  payload: {orderDetails}
})

export const addProduct = productId => ({
  type: ADD_TO_CART,
  payload: {productId}
})

export const removeProduct = productId => ({
  type: REMOVE_FROM_CART,
  payload: {productId}
})

// export const latestOrderDetails = orderDetails => ({
//   type: LATEST_ORDER_DETAILS,
//   payload: {orderDetails}
// })

export function placeOrder(phoneNumber, key, orderDetails={}, locationID, contactNumber) {
  return dispatch => {
    dispatch(orderPlacementBegin());
    return fetch(`${API}/order/place/`, {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `ApiKey ${phoneNumber}:${key}`
      },
      method: 'POST',
      body: JSON.stringify(
        {
          'orderDetails': orderDetails,
          'orderAddress': {
            'locationID': locationID
          },
          'contactNumber': contactNumber
        }
      )
    })
    .then(res => res.json())
    .then (res => {
      dispatch(orderPlacementSuccess(res))
      return res
    })
    .catch(err => {
      console.error('Error orderPlacemenError===>', err);
      let error = {
        err,
        payloadBody: JSON.stringify(
          {
            'orderDetails': orderDetails,
            'orderAddress': {
              'locationID': locationID
            },
            'contactNumber': contactNumber
          }
        )
      }
      Sentry.captureException(new Error('API: Order Placement Error', error))
    })

  }
}
export function addToCart(productId) {
  return dispatch => {dispatch(addProduct(productId))}
}
export function removeFromCart(productId) {
  return dispatch => {dispatch(removeProduct(productId))}
}


export function fetchAllProducts() {
  return dispatch => {
    dispatch(fetchProductListBegin());
    return fetch(`${API}/products`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then (res => {
      dispatch(fetchProductSuccess(res))
      return res
    })
    .catch(error => {
      console.error('Error productActions===>', error)
      Sentry.captureException(new Error('API: Get Product List', error))
    })
  }
}

export function fetchOutOfStockProducts() {
  return dispatch => {
    return fetch(`${API}/products/outofstock`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then (res => {
      if(res.sold_out){
        dispatch(soldOut(res))
      } else {
        dispatch(fetchOutOfStockProductSuccess(res))
      }
      return res
    })
    .catch(error => {
      console.error('Error productActions===>', error)
      Sentry.captureException(new Error('API: Out of stock check API call', error))
    })
  }
}
