import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import {storage} from '../utils';
import userSlice from './slices/userSlice';
import appSlice from './slices/appSlice';
import {combineReducers} from 'redux';

export const persistConfig = {
  key: 'root',
  storage: storage,
  version: 1,
};

export const rootReducer = combineReducers({
  user: userSlice,
  app: appSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);
export {store, persistor};
