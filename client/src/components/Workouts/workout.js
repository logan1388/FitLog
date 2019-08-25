import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Workoutlog from './Workout/workoutlog';
import { connect } from 'react-redux';

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
            exercises.map(e => e.open = false);
            this.setState({ workouts : exercises });
            this.initial.workouts = exercises;
            this.setState({ workouts: res.data });
        })
    }

    expandExercise = (exercise) => {
        console.log("Expand clicked! "+exercise);
        const initialState = this.initial;
        const updatedExercises = {
            ...initialState.workouts
        };
        const flag = this.state.workouts[exercise]['open'];
        const category = this.state.workouts[exercise]['category'];
        const name = this.state.workouts[exercise]['name'];
        Object.keys(initialState.workouts).map(e => {
            if(updatedExercises[e].name !== updatedExercises[exercise].name && updatedExercises[e].open === true){
                console.log("Open: "+e);
                updatedExercises[e].open = false;
                updatedExercises[e].log = null;
            }
        })
        this.setState({ workouts: updatedExercises});
        if(!flag){
            let log = {};
            let logs = {};
            axios.get('http://localhost:5000/api/workoutlog/'+category+'/'+name)
            .then(res => {
                log = res.data;
                console.log(log);
                const arrayToObject = (array) =>
                    array.reduce((obj, item) => {
                        obj[item._id] = item
                        return obj
                }, {})
                logs = arrayToObject(log);
                console.log(logs);
            })
            updatedExercises[exercise].log = (<Workoutlog
                key = {this.state.workouts[exercise]._id}
                isOpened = {true}
                logs = {logs}
                category = {this.state.workouts[exercise]['category']}>{this.state.workouts[exercise]['name']}
            </Workoutlog>)
        }else{
            updatedExercises[exercise].log = null;
        }
        updatedExercises[exercise]['open'] = !flag;
        initialState.workouts.map(e => {
            if(e.name !== updatedExercises[exercise].name){
                e.open = false;
            }
        })
        this.setState({ workouts : updatedExercises });
    }

    render(){
        if(!this.state.workouts){
            return <div/>
        }
        // return(
        //     <Fragment>
        //         <Exercises
        //             exercises = {this.state.workouts}
        //             expandExercise = {this.expandExercise}></Exercises>
        //     </Fragment>
        // )
        return Object.keys(this.state.workouts)
        .map(key => {
            return [...Array(this.state.workouts[key])].map(() => {
                return (<Fragment>
                <div key = {this.state.workouts[key]._id} 
                    className = 'ExerciseContainer'
                    onClick = {() => this.expandExercise(key)}
                    ><span>{this.state.workouts[key]['name']}</span>
                </div>
                <div>{this.state.workouts[key].log}</div>
                </Fragment>)
            });      
        });
    }
}

const mapStateToProps = state => {
    return {
        // workouts: state.workouts,
        // logs: state.logs
    }
}

export default connect(mapStateToProps)(Workout);