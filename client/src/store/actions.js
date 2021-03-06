import axios from 'axios';
import moment from 'moment';
import { endpoint } from '../config';

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

export const LOGIN_BEGIN = "LOGIN_BEGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const REGISTER_RESET = "REGISTER_RESET";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const CLEAR_REGISTERERROR = "CLEAR_REGISTERERROR";
export const CLEAR_LOGINERROR = "CLEAR_LOGINERROR";

export const FETCH_WORKOUTHISTORY = "FETCH_WORKOUTHISTORY";

export const FETCH_MAXWEIGHT = "FETCH_MAXWEIGHT";

export const fetchExercises = (workout) => {
    return dispatch => {
        dispatch(fetchExercisesBegin());
        axios.get(endpoint+'/api/exercises/'+workout)
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

export const expandExercise = (workouts, category, name, userId) => {
    return dispatch => {
        workouts.map(e => {
            if(e.name !== name && e.open === true){
                e.open = false;
                e.log = null;
            }
        });
        let exercise = {
            userId: userId,
            category: category,
            name: name
        };
        dispatch(expandExerciseBegin());
        dispatch(maxWeight(userId, category, name));
        axios.post(endpoint+'/api/workoutlog/log',exercise)
        .then(res => {
                var logs = res.data;
                logs.map(log => {
                    log.date = moment(log.date).utc().format('MM/DD/YY HH:mm')
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
        axios.post(endpoint+'/api/workoutlog/',exerciseLog)
        .then(res => {
            dispatch(addMaxWeight(exerciseLog, workouts));
            dispatch(addTodayWorkout(exerciseLog.userId, exerciseLog.category, exerciseLog.date));
            return logToBeUpdated;
        })
        .catch(error => dispatch(addExerciseLogFailure(error)));
    }
}

export const addTodayWorkout = (userId, category, date) => {
    return dispatch => {
        let workout = {
            userId: userId,
            category: category,
            date: date
        }
        axios.post(endpoint+'/api/workout/',workout)
        .then(res => {
            console.log(res);
        })
        .catch(error => console.log(error));
    }
}

export const login = (email, password, history) => {    
    return dispatch => {
        dispatch(loginBegin());
        let loginRequest = {
            "email": email,
            "password": password
        }
        axios.post(endpoint+'/api/users/authenticate/',loginRequest)
        .then(res => {
            localStorage.setItem('user', JSON.stringify(res));
            dispatch(loginSuccess(res.data.user));
            history.push('/Dashboard');
            return res.data.user;
        })
        .catch(error => dispatch(loginFailure(error)));
    }
}

export const register = (name, username, email, password, history) => {    
    return dispatch => {
        let registerRequest = {
            "name": name,
            "username": username,
            "email": email,
            "password": password
        }
        axios.post(endpoint+'/api/users/',registerRequest)
        .then(res => {
            dispatch(registerSuccess());
            history.push('/');
        })
        .catch(error => dispatch(registerFailure(error)));
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('user');
        dispatch(logoutSuccess());
    }
}

export const addMaxWeight = (exerciseLog, workouts) => {
    return dispatch => {
        axios.post(endpoint+'/api/maxweight/',exerciseLog)
        .then(res => {
            dispatch(expandExercise(workouts, exerciseLog.category, exerciseLog.name, exerciseLog.userId));
        })
        .catch(error => dispatch(addExerciseLogFailure(error)));
    }
}

export const maxWeight = (userId, category, name) => {
    return dispatch => {
        let maxWeightRequest = {
            "userId": userId,
            "category": category,
            "name": name
        };
        axios.post(endpoint+'/api/maxweight/weight',maxWeightRequest)
        .then(res => {
            dispatch(fetchMaxWeightSuccess(res.data));
        })
        .catch(error => dispatch(addExerciseLogFailure(error)));
    }
}

export const workoutHistory = (userId) => {
    return dispatch => {
        let param = {
            userId: userId
        }
        axios.post(endpoint+'/api/workout/workoutHistory', param)
            .then(res => {
                let workoutHist = res.data;
                dispatch(workoutHistorySuccess(workoutHist));
            })
            .catch(error => console.log(error));
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

export const loginBegin = () => ({
    type: LOGIN_BEGIN
});

export const loginSuccess = user => ({
    type: LOGIN_SUCCESS,
    payload: { user }
});

export const loginFailure = error => ({
    type: LOGIN_FAILURE,
    payload: { error }
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
});

export const registerReset = () => ({
    type: REGISTER_RESET
});

export const registerSuccess = () => ({
    type: REGISTER_SUCCESS
});

export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: { error }
});

export const clearRegisterErrorMsg = () => ({
    type: CLEAR_REGISTERERROR
});

export const clearLoginErrorMsg = () => ({
    type: CLEAR_LOGINERROR
})

export const workoutHistorySuccess = workoutHist => ({
    type: FETCH_WORKOUTHISTORY,
    payload: { workoutHist }
});

export const fetchMaxWeightSuccess = maxWeight => ({
    type: FETCH_MAXWEIGHT,
    payload: { maxWeight }
});