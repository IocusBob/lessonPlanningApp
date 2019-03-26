import {
  CREATE_LESSON_PLAN,
  FETCH_LESSON_PLANS,
  FETCH_LESSON_PLAN,
  EDIT_LESSON_PLAN,
  DELETE_LESSON_PLAN } from '../actions/types'

import _ from 'lodash';


export default (state={}, action) => {
  switch(action.type){
      case FETCH_LESSON_PLANS:
        return {...state, ..._.mapKeys(action.payload, 'id')}
      case FETCH_LESSON_PLAN:
        return {...state, [action.payload.id]: action.payload};
      case CREATE_LESSON_PLAN:
        return {...state, [action.payload.id]: action.payload};
      case EDIT_LESSON_PLAN:
        return {...state, [action.payload.id]: action.payload};
      case DELETE_LESSON_PLAN:
        return _.omit(state, action.payload);
      default:
        return state
  }
}
