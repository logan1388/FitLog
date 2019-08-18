import React from 'react';

import Workoutlog from '../Workouts/Workout/workoutlog'

const exercises = (props) => {
    return Object.keys(props.exercises)
            .map(key => {
                return [...Array(props.exercises[key])].map(() => {
                    return (<Workoutlog
                        key = {key}
                        clicked = {() => props.expandExercise(key)}
                        isOpened = {props.exercises[key]['open']}
                        category = {props.exercises[key]['category']}>{props.exercises[key]['name']}
                    </Workoutlog>)
                });      
            });
}

export default exercises;