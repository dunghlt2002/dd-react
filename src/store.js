import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';

import { userReducer } from './reducers/userReducers';

// const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON('userInfo') || null;
console.log('userinfo from Cookie in store' + JSON.stringify(userInfo));


const initialState = { userSignin: { userInfo } };

const reducer = combineReducers({
  userSignin: userReducer
})

//composeEnhancer de cho extension REDUX tren google chrome work tot - Dung 
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

store.subscribe(function(){
  console.log('trong store ne ' + JSON.stringify(store.getState()));
})

export default store;
