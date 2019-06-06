import {
  INVALIDATE_USER,
  USER_REGISTER,
  USER_LOGIN,
  ADD_ADDRESS,
  SELECT_ADDRESS,
  ERROR,
  USER_LOGOUT,
  PAST_ORDERS,
  CANCEL_ORDER
} from '../actions/userAction';

const initialState = {
  info: {
    selectedAddress: null
  },
  isLoggedIn: false,
  error: null,
  
}

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_USER:
      return {
        ...state,
        authToken: '',
        error: null
      }
    case SELECT_ADDRESS:
      return {
        ...state,
        info: {
          ...state.info,
          selectedAddress: action.payload.info
        }
      }    
    case ADD_ADDRESS:
      return {
        ...state,
        info: {
          ...state.info,
          address: [...state.info.address, action.payload.info]
        }
      }
    case USER_REGISTER:
      return {
        ...state,
        isLoggedIn: true,
        info: {
          ...state.info,
          ...action.payload.info
        }
      }
    case USER_LOGOUT:
      return{
        ...state,
        isLoggedIn: false,
        info:{
          selectedAddress: null
        }
      }
    case PAST_ORDERS:
      return {
        ...state,
        isLoggedIn: true,
        info: {
          ...state.info,
          ...action.payload.info
        }
      }
    case USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        info: {
          ...state.info,
          ...action.payload.info
        }
      }
    case CANCEL_ORDER:
      return {
        ...state,
        isLoggedIn: true,
        info: {
          ...state.info,
          ...action.payload.info
        }
      }
    default:
      return state
  }
}