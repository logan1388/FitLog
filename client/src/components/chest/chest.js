import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Exercises from '../chest/exercises';

class Chest extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.initial = {};
        this.getInitialState();
        this.expandExercise = this.expandExercise.bind(this);
    }

    getInitialState = () => {
        axios.get('http://localhost:5000/api/exercises')
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

export default Chest;