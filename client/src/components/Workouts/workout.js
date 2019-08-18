import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Exercises from './exercises';

class Workout extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.initial = {};
        this.workout = this.props.match.params.id;
        this.getInitialState();
        this.expandExercise = this.expandExercise.bind(this);
    }

    getInitialState = () => {
        axios.get('http://localhost:5000/api/exercises/'+this.workout)
        .then(res =>  {
            var exercises = res.data;
            exercises.map(e => {
                e.open = false;
            });
            this.state.workouts = exercises;
            this.initial.workouts = exercises;
            this.setState({ workouts: res.data });
        })
    }

    expandExercise = (exercise) => {
        const initialState = this.initial;
        const updatedExercises = {
            ...initialState.workouts
        };
        const flag = this.state.workouts[exercise]['open'];
        const category = this.state.workouts[exercise]['category'];
        const name = this.state.workouts[exercise]['name'];
        if(!flag){
            axios.get('http://localhost:5000/api/workoutlog/'+category+'/'+name)
            .then(res => {
                var log = res.data;
            })
        }
        updatedExercises[exercise]['open'] = !flag;
        initialState.workouts.map(e => {
            if(e.name != updatedExercises[exercise].name){
                e.open = false;
            }
        })
        this.setState({ workouts : updatedExercises });
    }

    render(){
        if(!this.state.workouts){
            return <div/>
        }
        return(
            <Fragment>
                <Exercises
                    exercises = {this.state.workouts}
                    expandExercise = {this.expandExercise}></Exercises>
            </Fragment>
        )
    }
}

export default Workout;