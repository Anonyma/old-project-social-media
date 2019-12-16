import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// El store es el corazón de Redux <3

const initialState = {};

// Con thunk podremos "accionar" interacciones con el store de forma asíncrona (ej. cuando llegue la respuesta del server)
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
