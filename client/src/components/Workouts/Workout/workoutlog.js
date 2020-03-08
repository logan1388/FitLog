import React, { Component, Fragment } from 'react';
import { Collapse } from 'react-collapse';
import Workouthistory from './workouthistory';
import { connect } from 'react-redux';
import { addExerciseLog } from '../../../store/actions';
import WorkoutInput from './workoutInput';

class Workoutlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            log: {}
        }
        this.logs = null;
        this.exerciseLog = {};
        this.logTitle = null;
    }

    getTimestamp = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();
        if (date < 10) date = '0' + date;
        if (month < 10) month = '0' + month;
        if (hours < 10) hours = '0' + hours;
        if (min < 10) min = '0' + min;
        if (sec < 10) sec = '0' + sec;
        let timestamp = month + '/' + date + '/' + year + ' ' + hours + ':' + min + ':' + sec;
        return timestamp;
    }

    addLog = (weight, unit, count) => {
        let timestamp = this.getTimestamp();
        let id = JSON.parse(localStorage.getItem('user')).data.user.id;
        this.exerciseLog = {
            "userId": this.props.user.id ? this.props.user.id : id,
            "category": this.props.category,
            "name": this.props.children,
            "date": timestamp,
            "weight": weight,
            "unit": unit,
            "count": count
        };
        this.props.dispatch(addExerciseLog(this.exerciseLog, this.props.logs, this.props.workouts));
    }

    render() {
        if (this.props.logs.length > 0) {
            this.logTitle = (
                <div id='LogsTitle'>
                    <span id='Title_DateTime'>Date & Time</span>
                    <span id='Title_Weight'>Weight</span>
                    <span id='Title_Unit'>Unit</span>
                    <span id='Title_Count'>Count</span>
                </div>
            )
            if (this.props.maxWeight) {
                this.maxWeight = (
                    <div className='text-center font-weight-bold'>
                        <span>Max Weight: {this.props.maxWeight.weight} {this.props.maxWeight.unit}</span>
                        <span className='pl-3'>Count: {this.props.maxWeight.count}</span>
                    </div>
                )
            }
        }
        return (
            <Fragment>
                <Collapse isOpened={this.props.isOpened}>
                    {this.maxWeight}
                    <div className='ExpExerciseContainer'>
                        <WorkoutInput addLog={(weight, unit, count) => this.addLog(weight, unit, count)} />
                        {this.logTitle}
                        <div id='LogContainer'>
                            <Workouthistory></Workouthistory>
                        </div>
                    </div>
                </Collapse>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        workouts: state.workouts,
        logs: state.logs,
        maxWeight: state.maxWeight
    }
};

export default connect(mapStateToProps)(Workoutlog);