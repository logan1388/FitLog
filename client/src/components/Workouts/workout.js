import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Workoutlog from './Workout/workoutlog';
import { connect } from 'react-redux';
import { fetchExercises } from '../../store/actions';
import exercises from './exercises';

class Workout extends Component {
    constructor(props){
        super(props);
        this.state = {
            workouts: [],
            log: []
        };
        this.initial = {};
        this.workout = this.props.match.params.id;
        //this.props.getInitialState(this.workout);
        this.expandExercise = this.expandExercise.bind(this);
    }

    // getInitialState = () => {
    //     axios.get('http://localhost:5000/api/exercises/'+this.workout)
    //     .then(res =>  {
    //         var exercises = res.data;
    //         exercises.map(e => e.open = false);
    //         this.setState({ workouts : exercises });
    //         this.initial.workouts = exercises;
    //         this.setState({ workouts: res.data });
    //     })
    // }

    componentDidMount(){
        this.props.dispatch(fetchExercises(this.workout));
    }

    expandExercise = (exercise) => {
        const initialState = this.props.workouts;
        const updatedExercises = initialState
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
                //console.log(logs);
            updatedExercises[exercise].log = (<Workoutlog
                key = {this.props.workouts[exercise]._id}
                isOpened = {true}
                logs = {logs}
                category = {this.props.workouts[exercise]['category']}>{this.props.workouts[exercise]['name']}
            </Workoutlog>)
            console.log(updatedExercises);
            })
        }else{
            updatedExercises[exercise].log = null;
        }
        updatedExercises[exercise]['open'] = !flag;
        initialState.map(e => {
            if(e.name !== updatedExercises[exercise].name){
                e.open = false;
            }
        })
        //this.state.log = updatedExercises[exercise].log;
        //this.setState({ workouts : updatedExercises[exercise].log });
    }

    render(){
        if(!this.props.workouts){
            return <div/>
        }
        // return(
        //     <Fragment>
        //         <Exercises
        //             exercises = {this.state.workouts}
        //             expandExercise = {this.expandExercise}></Exercises>
        //     </Fragment>
        // )
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

// const mapDispatchToProps = dispatch => {
//     return {
//         getInitialState: (workout) => dispatch({ type: 'FETCH_EXERCISES', workout: workout }),
//         expandExercise: (exercise) => dispatch({})
//     }
// };

export default connect(mapStateToProps)(Workout);