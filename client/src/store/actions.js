import axios from 'axios';

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
                dispatch(fetchExercisesSuccess(res.data));
                return res.data;
            })
            .catch(error => dispatch(fetchExercisesFailure(error)));
    };
}

export const FETCH_EXERCISES_BEGIN = "FETCH_EXERCISES_BEGIN";
export const FETCH_EXERCISES_SUCCESS =
  "FETCH_EXERCISES_SUCCESS";
export const FETCH_EXERCISES_FAILURE =
  "FETCH_EXERCISES_FAILURE";

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