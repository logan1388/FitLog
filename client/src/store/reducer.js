import {
    FETCH_EXERCISES_BEGIN,
    FETCH_EXERCISES_SUCCESS,
    FETCH_EXERCISES_FAILURE,
    EXPAND_EXERCISE_BEGIN,
    EXPAND_EXERCISE_SUCCESS,
    EXPAND_EXERCISE_FAILURE,
    CLOSE_EXPANDEXERCISE_BEGIN,
    CLOSE_EXPANDEXERCISE_SUCCESS,
    CLOSE_EXPANDEXERCISE_FAILURE
  } from "../store/actions";
  
  const initialState = {
    workouts: [],
    expandExercise: false,
    logs: [],
    loading: false,
    error: null
  };
  
  export default function workoutReducer(
    state = initialState,
    action
  ) {
    switch (action.type) {
        case FETCH_EXERCISES_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
  
        case FETCH_EXERCISES_SUCCESS:
            return {
                ...state,
                loading: false,
                workouts: action.payload.exercises
            };
  
        case FETCH_EXERCISES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                workouts: []
            };
    
        case EXPAND_EXERCISE_BEGIN:
            return {
              ...state,
              loading: true,
              error: null
            };
      
        case EXPAND_EXERCISE_SUCCESS:
            return {
              ...state,
              loading: false,
              expandExercise: true,
              logs: action.payload.logs
            };
      
        case EXPAND_EXERCISE_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.payload.error,
              logs: []
            };
        
        case CLOSE_EXPANDEXERCISE_BEGIN: 
            return {
                ...state,
                loading: true,
                error: null
            };
    
        case CLOSE_EXPANDEXERCISE_SUCCESS:
            return {
                ...state,
                loading: false,
                expandExercise: false,
                workouts: action.payload.exercises
            };
    
        case CLOSE_EXPANDEXERCISE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
      default:
        return state;
    }
  }
  