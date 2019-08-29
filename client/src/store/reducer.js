import {
    FETCH_EXERCISES_BEGIN,
    FETCH_EXERCISES_SUCCESS,
    FETCH_EXERCISES_FAILURE,
    EXPAND_EXERCISE_BEGIN,
    EXPAND_EXERCISE_SUCCESS,
    EXPAND_EXERCISE_FAILURE
  } from "../store/actions";
  
  const initialState = {
    workouts: [],
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
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_EXERCISES_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        return {
          ...state,
          loading: false,
          workouts: action.payload.exercises
        };
  
      case FETCH_EXERCISES_FAILURE:
        // The request failed, but it did stop, so set loading to "false".
        // Save the error, and we can display it somewhere
        // Since it failed, we don't have items to display anymore, so set it empty.
        // This is up to you and your app though: maybe you want to keep the items
        // around! Do whatever seems right.
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          workouts: []
        };
    
        case EXPAND_EXERCISE_BEGIN:
            // Mark the state as "loading" so we can show a spinner or something
            // Also, reset any errors. We're starting fresh.
            return {
              ...state,
              loading: true,
              error: null
            };
      
          case EXPAND_EXERCISE_SUCCESS:
            // All done: set loading "false".
            // Also, replace the items with the ones from the server
            return {
              ...state,
              loading: false,
              logs: action.payload.logs
            };
      
          case EXPAND_EXERCISE_FAILURE:
            // The request failed, but it did stop, so set loading to "false".
            // Save the error, and we can display it somewhere
            // Since it failed, we don't have items to display anymore, so set it empty.
            // This is up to you and your app though: maybe you want to keep the items
            // around! Do whatever seems right.
            return {
              ...state,
              loading: false,
              error: action.payload.error,
              logs: []
            };
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }
  