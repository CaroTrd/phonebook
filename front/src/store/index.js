import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import contacts from '../reducers/contacts.reducer';

// to update the store
const rootReducer = combineReducers({
  contacts
})

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  // to dispatch in function and not in action
  applyMiddleware(thunk),
  // other store enhancers if any
);

export const store = createStore(rootReducer, enhancer);
