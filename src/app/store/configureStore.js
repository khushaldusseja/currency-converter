// import React from "react";
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers/rootReducer';

export default function configureStore(history) {

  let middleware = [thunk, reduxImmutableStateInvariant(), routerMiddleware(history)];

  if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, logger];
  }

  return createStore(
    connectRouter(history)(rootReducer),
    compose(applyMiddleware(...middleware))
  );
}
