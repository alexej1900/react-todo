import { createContext } from 'react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { todoReducer } from './reducers/todoReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(
  todoReducer,
  composeWithDevTools(
  applyMiddleware(thunk),
));

const AppContext = createContext(store);

export default AppContext;
