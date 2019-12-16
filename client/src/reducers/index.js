import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';

// Este archivo y el ".store" son el corazoncito del manejo del estado global de la aplicación (Redux)
export default combineReducers({
  alert,
  auth,
  profile,
  post
});
