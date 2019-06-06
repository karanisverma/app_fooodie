import {
  FETCH_PRODUCTS_LIST_SUCCESS,
  FETCH_PRODUCTS_LIST_BEGIN,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ORDER_PLACEMENT_SUCCESS,
  ORDER_PLACEMENT_BEGIN,
  CHECKOUT_FLOW,
  EMPTY_CART,
  OOS_PRODUCTS,
  SOLD_OUT,
  DELETE_FROM_CART
} from '../actions/productAction'

const initialState = {
  products: [],
  oosProducts: [],
  soldOut: false,
  loading: false,
  isCheckoutFlow: false,
  isCartEmpty: true,
  minimumOrderAmount: null,
  freeDeliveryOrderAmount: null,
  deliveryCharge: null,
  placedOrder: {}
}

export default function productReducer (state = initialState, action) {
  switch(action.type) {
    case CHECKOUT_FLOW:
      return {
        ...state,
        isCheckoutFlow: true
      }
    case SOLD_OUT:
      return {
        ...state,
        soldOut: true
      }
    case OOS_PRODUCTS:
      return{
        ...state,
        oosProducts: action.payload.oos_products
      }
    case ADD_TO_CART:
      const productIndex = state.products.map(p => p.product_id).indexOf(action.payload.productId)
      let product = state.products[productIndex]
      const addedProducts = Object.assign([...state.products], 
        {productIndex:Object.assign(product, {quantity: parseInt(product.quantity)+1})})
      return {
        ...state,
        isCartEmpty: false,
        products: addedProducts
      }

    case REMOVE_FROM_CART:
      const productIndexCart = state.products.map(p => p.product_id).indexOf(action.payload.productId)
      let removedProduct = state.products[productIndexCart];
      const removedProducts = Object.assign([...state.products],
        { productIndexCart: Object.assign(removedProduct, { quantity: parseInt(removedProduct.quantity) - 1 }) })
      let cartItems = removedProducts.filter((product)=>(product.quantity > 0))
      if (cartItems.length > 0) {
        return {
          ...state,
          isCartEmpty: false,
          products: removedProducts
        }
      } else {
        return {
          ...state,
          isCartEmpty: true,
          products: removedProducts
        }
      }
    case DELETE_FROM_CART:
      const updatedProducts = state.products.map( p => { 
                                if (action.payload.oosProductIds.includes(p.product_id)) {
                                p.quantity = 0
                                p.status = 'outofstock'
                                }
                                return p
                              })
      return{
        ...state,
        products:updatedProducts
      }

    case ORDER_PLACEMENT_BEGIN:
      return {
        ...state,
        loading: true
      }
    case ORDER_PLACEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        placedOrder:action.payload
      }

    case FETCH_PRODUCTS_LIST_BEGIN:
      return {
        ...state,
        loading: true
      }
    case EMPTY_CART:
      const productList2 = action.payload.objects.map(product => (Object.assign({}, product, { 'quantity': 0 })))
      return {
        ...state,
        products: productList2,
        isCartEmpty: true
      }
    case FETCH_PRODUCTS_LIST_SUCCESS:
      const productList = action.payload.objects.map(product => (Object.assign({}, product, { 'quantity': 0 })))
      return {
        ...state,
        loading: false,
        isCartEmpty: true,
        products: productList,
        minimumOrderAmount: action.payload.minimum_order,
        freeDeliveryOrderAmount: action.payload.minimum_free_delivery_order_amount,
        deliveryCharge: action.payload.delivery_charge
      }

    default:
      return state
  }
}
