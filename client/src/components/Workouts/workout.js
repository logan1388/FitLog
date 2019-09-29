import React, { Component, Fragment } from 'react';
import Workoutlog from './Workout/workoutlog';
import { connect } from 'react-redux';
import { fetchExercises } from '../../store/actions';
import { expandExercise } from '../../store/actions';
import { closeExpandExercise } from '../../store/actions';

class Workout extends Component {
    constructor(props){
        super(props);
        this.state = {
            workouts: [],
            log: []
        };
        this.workout = this.props.match.params.id;
        this.expandExercise = this.expandExercise.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(fetchExercises(this.workout));
    }

    expandExercise = (exercise) => {
        const updatedExercises = this.props.workouts;
        const flag = this.props.workouts[exercise]['open'];
        const category = this.props.workouts[exercise]['category'];
        const name = this.props.workouts[exercise]['name'];
        if(!flag){
            let id = JSON.parse(localStorage.getItem('user')).data.user.id;
            let userId = this.props.user.id ? this.props.user.id : id;
            this.props.dispatch(expandExercise(this.props.workouts, category, name, userId));
            updatedExercises[exercise].log = (<Workoutlog
                key = {this.props.workouts[exercise]._id}
                isOpened = {true}
                logs = {this.props.logs}
                category = {this.props.workouts[exercise]['category']}>{this.props.workouts[exercise]['name']}
            </Workoutlog>)
        }else{
            this.props.dispatch(closeExpandExercise(this.props.workouts, name));
            updatedExercises[exercise].log = null;
        }
        updatedExercises[exercise]['open'] = !flag;
    }

    render(){
        if(!this.props.workouts){
            return <div/>
        }
        return Object.keys(this.props.workouts)
        .map(key => {
            return [...Array(this.props.workouts[key])].map(() => {
                return (<Fragment key = {this.props.workouts[key]._id}>
                <div className = 'ExerciseContainer'
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
    return {
        user: state.user,
        workouts: state.workouts,
        expandExercise: state.expandExercise,
        logs: state.logs
    }
};

export default connect(mapStateToProps)(Workout);