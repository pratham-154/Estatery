import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import { persistStore, persistReducer, PERSIST } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  	// reducer: rootReducer,
  	reducer: persistedReducer,
  	middleware:(getDefaultMiddleware) =>
    	getDefaultMiddleware({
      	serializableCheck: {
        	ignoredActions: [ PERSIST ],
      	},
    }),
});

let persistor = persistStore(store);

module.exports =  {
  store,
  persistor
};