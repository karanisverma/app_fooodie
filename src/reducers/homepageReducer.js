import {
  SET_ACTIVE_TAB,
  FETCH_PRODUCTS_SUCCESS
} from '../actions/homepageAction';

const initialState = {
  items: [],
  activeTab:0,
};

export default function homepageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_TAB:
      return{
        ...state,
        activeTab: action.payload.activeTab
      };
    case FETCH_PRODUCTS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      // console.log('output reducer======>', action.payload.products)
      return {
        ...state,
        items: action.payload.products
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}