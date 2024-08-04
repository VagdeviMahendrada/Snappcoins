import { applyMiddleware, legacy_createStore as createStore, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage, // storage mechanism (e.g., local storage)
  // whitelist: [] // Specify the reducers you want to persist, if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;