import React, { Component, Fragment } from 'react';
import Workoutlog from './Workout/workoutlog';
import { connect } from 'react-redux';
import { fetchExercises } from '../../store/actions';
import { expandExercise } from '../../store/actions';

class Workout extends Component {
    constructor(props){
        super(props);
        this.state = {
            workouts: [],
            log: []
        };
        this.initial = {};
        this.workout = this.props.match.params.id;
        this.expandExercise = this.expandExercise.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(fetchExercises(this.workout));
    }

    expandExercise = (exercise) => {
        const initialState = this.props.workouts;
        const updatedExercises = initialState
        console.log(exercise);
        const flag = this.props.workouts[exercise]['open'];
        const category = this.props.workouts[exercise]['category'];
        const name = this.props.workouts[exercise]['name'];
        Object.keys(initialState).map(e => {
            if(updatedExercises[e].name !== updatedExercises[exercise].name && updatedExercises[e].open === true){
                console.log("Open: "+e);
                updatedExercises[e].open = false;
                updatedExercises[e].log = null;
            }
        })
        if(!flag){
            this.props.dispatch(expandExercise(category, name));
            updatedExercises[exercise].log = (<Workoutlog
                key = {this.props.workouts[exercise]._id}
                isOpened = {true}
                logs = {this.props.logs}
                category = {this.props.workouts[exercise]['category']}>{this.props.workouts[exercise]['name']}
            </Workoutlog>)
            console.log(updatedExercises);
        }else{
            updatedExercises[exercise].log = null;
        }
        updatedExercises[exercise]['open'] = !flag;
        initialState.map(e => {
            if(e.name !== updatedExercises[exercise].name){
                e.open = false;
            }
        })
    }

    render(){
        if(!this.props.workouts){
            return <div/>
        }
        return Object.keys(this.props.workouts)
        .map(key => {
            return [...Array(this.props.workouts[key])].map(() => {
                return (<Fragment>
                <div key = {this.props.workouts[key]._id} 
                    className = 'ExerciseContainer'
                    onClick = {() => this.expandExercise(key)}
                    ><span>{this.props.workouts[key]['name']}</span>
                </div>
                <div>{this.props.workouts[key].log}</div>
                </Fragment>)
            });      
        });
    }
}

const mapStateToProps = state => {
    console.log(state.workouts);
    return {
        workouts: state.workouts,
        logs: state.logs
    }
};

export default connect(mapStateToProps)(Workout);