import { configureStore } from '@reduxjs/toolkit';
import modules from './modules';
import logger from 'redux-logger';

export default function createStore() {
  const store = configureStore({  
    reducer:modules,
    devTools:true,
    middleware:[logger]
  })

  return store;
};