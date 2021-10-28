import mainReducer from './reducers/mainReducer';
import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['forumState'],
};

const persistedReducer = persistReducer(persistConfig, mainReducer);

export const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
export const persistor = persistStore(store);
