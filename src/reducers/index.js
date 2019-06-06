import { combineReducers } from 'redux'
import homepageReducer from './homepageReducer'
import libraryReducer from './libraryReducer'
import selectionReducer from './selectionReducer'
import userReducer from './userReducer';
import productReducer from './productReducer';

// All reducer will come here
export default combineReducers({
  productInfo: productReducer,
  homePageInfo: homepageReducer,
  libraries: libraryReducer,
  selectedLibraryId: selectionReducer,
  user: userReducer
})