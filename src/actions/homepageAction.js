
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
import Sentry from 'sentry-expo';

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

export const setMenuActiveTab = activeTab => ({
  type: SET_ACTIVE_TAB,
  payload: { activeTab }
});

export function selectActiveTab(tabNumber) {
  return dispatch => {dispatch(setMenuActiveTab(tabNumber))}
}
export function fetchFeatureProducts() {
  return dispatch => {

    return fetch("https://s3.amazonaws.com/aws-website-fooodiestore-s7bs1/assets/app/js/fooodie_banner.json")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchProductsSuccess(json));
        return json;
      })
      .catch(error => {
        console.error('Error on homeopage====>', error)
        Sentry.captureException(new Error('API: Homepage Banner Error', error))
      })
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}