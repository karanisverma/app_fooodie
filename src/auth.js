import {AsyncStorage} from 'react-native';

export const AUTH_TOKEN_KEY = 'auth-token';
export const USER_EMAIL= 'user-email';
export const USER_PHONE= 'user-phone';
export const USER = 'user'

export const onAddAddress = (user) => {
  return  AsyncStorage.setItem(USER, JSON.stringify(user))
}

export const onSignIn = ({user}) => {
  return Promise.all([
    AsyncStorage.setItem(USER,  JSON.stringify(user)),
    AsyncStorage.setItem(AUTH_TOKEN_KEY, user.key),
    AsyncStorage.setItem(USER_EMAIL, user.email),
    AsyncStorage.setItem(USER_PHONE, user.phone)
  ]);
};

export const onSignOut = () => {
  return Promise.all([
    AsyncStorage.removeItem(USER),
    AsyncStorage.removeItem(AUTH_TOKEN_KEY),
    AsyncStorage.removeItem(USER_PHONE),
    AsyncStorage.removeItem(USER_EMAIL)
  ]);
};

export const getUser = () => AsyncStorage.getItem(USER);
export const getAuthToken = () => AsyncStorage.getItem(AUTH_TOKEN_KEY);
export const getUserEmail = () => AsyncStorage.getItem(USER_EMAIL);
export const getUserPhone = () => AsyncStorage.getItem(USER_PHONE);



// export const setZcAuthToken = authToken => AsyncStorage.setItem(ZC_AUTH_TOKEN_KEY, authToken);