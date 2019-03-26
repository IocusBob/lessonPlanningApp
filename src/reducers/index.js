import { combineReducers } from 'redux';
import{ reducer as formReducer } from 'redux-form'
import lessonsReducer from './lessonsReducer'
import authReducer from './authReducer'

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  lessons: lessonsReducer
})
