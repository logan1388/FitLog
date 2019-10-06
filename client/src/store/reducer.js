import {
    FETCH_EXERCISES_BEGIN,
    FETCH_EXERCISES_SUCCESS,
    FETCH_EXERCISES_FAILURE,
    EXPAND_EXERCISE_BEGIN,
    EXPAND_EXERCISE_SUCCESS,
    EXPAND_EXERCISE_FAILURE,
    CLOSE_EXPANDEXERCISE_SUCCESS,
    ADD_EXERCISELOG_BEGIN,
    ADD_EXERCISELOG_SUCCESS,
    ADD_EXERCISELOG_FAILURE,
    LOGIN_BEGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_RESET,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGOUT_SUCCESS,
    CLEAR_ERROR,
    FETCH_WORKOUTHISTORY,
    FETCH_MAXWEIGHT
  } from "../store/actions";
  
  const initialState = {
    user: {},
    workouts: [],
    logs: [],
    workoutHistory: [],
    loading: false,
    error: null,
    isAuthenticated: false,
    register: false,
    maxWeight: null
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
        
        case CLOSE_EXPANDEXERCISE_SUCCESS:
            return {
                ...state,
                loading: false,
                expandExercise: false,
                workouts: action.payload.exercises
            };
        
        case ADD_EXERCISELOG_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
          
        case ADD_EXERCISELOG_SUCCESS:
            return {
                ...state,
                loading: false,
                logs: action.payload.logs
            };
          
        case ADD_EXERCISELOG_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                logs: []
            };

        case FETCH_WORKOUTHISTORY:
            return {
                ...state,
                loading: false,
                workoutHistory: action.payload.workoutHist
            };

        case FETCH_MAXWEIGHT:
            return {
                ...state,
                loading: false,
                maxWeight: action.payload.maxWeight
            };

        case LOGIN_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
          
        case LOGIN_SUCCESS:
            console.log(action.payload.user);
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                isAuthenticated: true
            };
          
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                logs: []
            };

        case REGISTER_RESET:
            return {
                ...state,
                register: false
            };

        case REGISTER_SUCCESS:
            return {
                ...state,
                register: true,
                error: null
            };

        case REGISTER_FAILURE:
            return {
                ...state,
                register: false,
                error: action.payload.error.response.data
            };

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
            
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: {},
                isAuthenticated: false
            };
    
      default:
        return state;
    }
  }
  