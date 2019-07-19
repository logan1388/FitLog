import React, { Component, Fragment } from 'react';
import Header from '../layout/Header';
import Exercises from '../chest/exercises';

class Chest extends Component {
    constructor(props){
        super(props);
        this.state = this.getInitialState();
        this.expandExercise = this.expandExercise.bind(this);
    }

    getInitialState = () => {
        const initialState = {
            workouts : {
                BenchPress: {
                    open: false,
                    label: 'Bench Press'
                },
                InclinePress: {
                    open: false,
                    label: 'Incline Press'
                },
                DeclinePress: {
                    open: false,
                    label: 'Decline Press'
                },
                PecDeck: {
                    open: false,
                    label: 'Pec-Deck'
                }
            }
        }
        return initialState;
    }

    resetState = () => {
        this.setState(this.getInitialState());
    }

    expandExercise = (exercise) => {
        this.resetState();
        const initialState = this.getInitialState();
        const updatedExercises = {
            ...initialState.workouts
        };
        const flag = this.state.workouts[exercise]['open'];
        updatedExercises[exercise]['open'] = !flag;
        this.setState({
            workouts : updatedExercises
        });
    }

    render(){
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