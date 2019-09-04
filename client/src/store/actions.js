import axios from 'axios';
import moment from 'moment';

export const FETCH_EXERCISES_BEGIN = "FETCH_EXERCISES_BEGIN";
export const FETCH_EXERCISES_SUCCESS = "FETCH_EXERCISES_SUCCESS";
export const FETCH_EXERCISES_FAILURE = "FETCH_EXERCISES_FAILURE";

export const EXPAND_EXERCISE_BEGIN = "EXPAND_EXERCISE_BEGIN";
export const EXPAND_EXERCISE_SUCCESS = "EXPAND_EXERCISE_SUCCESS";
export const EXPAND_EXERCISE_FAILURE = "EXPAND_EXERCISE_FAILURE";

export const CLOSE_EXPANDEXERCISE_BEGIN = "CLOSE_EXPANDEXERCISE_BEGIN";
export const CLOSE_EXPANDEXERCISE_SUCCESS = "CLOSE_EXPANDEXERCISE_SUCCESS";
export const CLOSE_EXPANDEXERCISE_FAILURE = "CLOSE_EXPANDEXERCISE_FAILURE";

export const ADD_EXERCISELOG_BEGIN = "ADD_EXERCISELOG_BEGIN";
export const ADD_EXERCISELOG_SUCCESS = "ADD_EXERCISELOG_SUCCESS";
export const ADD_EXERCISELOG_FAILURE = "ADD_EXERCISELOG_FAILURE";

export const fetchExercises = (workout) => {
    return dispatch => {
        dispatch(fetchExercisesBegin());
        axios.get('http://localhost:5000/api/exercises/'+workout)
        .then(res => {
                var exercises = res.data;
                exercises.map(e => {
                    e.open = false;
                    e.log = null;
                });  
                dispatch(fetchExercisesSuccess(exercises));
                return exercises;
            })
            .catch(error => dispatch(fetchExercisesFailure(error)));
    };
}

export const expandExercise = (workouts, category, name) => {
    return dispatch => {
        workouts.map(e => {
            if(e.name !== name && e.open === true){
                e.open = false;
                e.log = null;
            }
        })
        dispatch(expandExerciseBegin());
        axios.get('http://localhost:5000/api/workoutlog/'+category+'/'+name)
        .then(res => {
                var logs = res.data;
                logs.map(log => {
                    log.date = moment(log.date).format('MM/DD/YY HH:mm')
                });
                dispatch(expandExerciseSuccess(logs));
                return logs;
            })
            .catch(error => dispatch(expandExerciseFailure(error)));
    };
}

export const closeExpandExercise = (workouts, exercise) => {
    return dispatch => {
        workouts.map(e =>  {
            if(e.name !== exercise){
                e.open = false;
                e.log = null;
            }
        });
        dispatch(closeExpandExerciseSuccess(workouts));
    }  
}

export const addExerciseLog = (exerciseLog, logToBeUpdated, workouts) => {
    return dispatch => {
        logToBeUpdated.push(exerciseLog);
        axios.post('http://localhost:5000/api/workoutlog/',exerciseLog)
        .then(res => {
            dispatch(expandExercise(workouts, exerciseLog.category, exerciseLog.name));
            return logToBeUpdated;
        })
        .catch(error => dispatch(addExerciseLogFailure(error)));
    }
}

export const fetchExercisesBegin = () => ({
    type: FETCH_EXERCISES_BEGIN
});

export const fetchExercisesSuccess = exercises => ({
    type: FETCH_EXERCISES_SUCCESS,
    payload: { exercises }
});

export const fetchExercisesFailure = error => ({
    type: FETCH_EXERCISES_FAILURE,
    payload: { error }
});

export const expandExerciseBegin = () => ({
    type: EXPAND_EXERCISE_BEGIN
});

export const expandExerciseSuccess = logs => ({
    type: EXPAND_EXERCISE_SUCCESS,
    payload: { logs }
});

export const expandExerciseFailure = error => ({
    type: EXPAND_EXERCISE_FAILURE,
    payload: { error }
});

export const closeExpandExerciseSuccess = exercises => ({
    type: CLOSE_EXPANDEXERCISE_SUCCESS,
    payload: { exercises }
});

export const addExerciseLogBegin = () => ({
    type: ADD_EXERCISELOG_BEGIN
});

export const addExerciseLogSuccess = logs => ({
    type: ADD_EXERCISELOG_SUCCESS,
    payload: { logs }
});

export const addExerciseLogFailure = error => ({
    type: ADD_EXERCISELOG_FAILURE,
    payload: { error }
});