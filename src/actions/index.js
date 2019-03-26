import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_LESSON_PLAN,
  FETCH_LESSON_PLANS,
  FETCH_LESSON_PLAN,
  EDIT_LESSON_PLAN,
  DELETE_LESSON_PLAN } from './types'
import lessons from '../apis/lessons'
import history from '../history'

export const signIn = (userId) => {
  return (
    {
      type: SIGN_IN,
      payload: userId
    }
  );
};
export const signOut = () => {
  return (
    {type: SIGN_OUT}
  );
};


export const createLessonPlan = formValues => async (dispatch, getState) => {
  const {userId} = getState().auth;
  const response = await lessons.post('/lessons', { ...formValues, userId})
  dispatch({type: CREATE_LESSON_PLAN, payload: response.data})
  history.push('/')
}

export const fetchLessonPlans = () => async dispatch => {
  const response = await lessons.get('/lessons');
  dispatch({type: FETCH_LESSON_PLANS, payload: response.data})
}

export const fetchLessonPlan = (id) => async dispatch => {
  const response = await lessons.get(`/lessons/${id}`);
  dispatch({type: FETCH_LESSON_PLAN, payload: response.data})
}


export const editLessonPlan = (id, formValues) => async dispatch => {
  const response = await lessons.patch(`/lessons/${id}`, formValues);
  dispatch({type: EDIT_LESSON_PLAN, payload: response.data})
  history.push('/')
}

export const deleteLessonPlan = (id) => async dispatch => {
  await lessons.delete(`/lessons/${id}`)
  dispatch({ type: DELETE_LESSON_PLAN, payload: id})
  history.push('/')
}
