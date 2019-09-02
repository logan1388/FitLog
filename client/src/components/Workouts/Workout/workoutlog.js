import React, { Component, Fragment } from 'react';
import {Collapse} from 'react-collapse';
import Workouthistory from './workouthistory';
import axios from 'axios';
import { connect } from 'react-redux';
import { addExerciseLog } from '../../../store/actions';

class Workoutlog extends Component {
    constructor(props){
        super(props);  
        this.state = {
            weight: 0,
            count: 0,
            unit: 'lbs',
            log: {}
        }
        this.logs = null;
        this.exerciseLog = {};
        this.logTitle = null;
    }

    componentDidMount = () => {
        this.getInitialState();
    }

    getInitialState = () => {
        this.setState({
            weight: 0,
            count: 0
        });
    }

    weightChange = (e) => {
        this.setState({weight: e.target.value});
    }
    unitChange = (e) => {
        this.setState({unit: e.target.value});
    }
    countChange = (e) => {
        this.setState({count: e.target.value});
    }
    getTimestamp = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth()+1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();
        if(date<10) date = '0' + date;
        if(month<10) month = '0' + month;
        if(hours<10) hours = '0' + hours;
        if(min<10) min = '0' + min;
        if(sec<10) sec = '0' + sec;
        let timestamp = month+'/'+date+'/'+year+' '+hours+':'+min+':'+sec;
        return timestamp;
    }

    addLog = () => {
        let timestamp = this.getTimestamp();
        this.getInitialState();
        this.exerciseLog = {
            "category": this.props.category,
            "name": this.props.children,
            "date": timestamp,
            "weight": this.state.weight,
            "unit": this.state.unit,
            "count": this.state.count
        };
        this.props.dispatch(addExerciseLog(this.exerciseLog, this.props.logs, this.props.workouts));
    }

    render(){
        if(this.props.logs.length > 0){
            this.logTitle = (
                <div id='LogsTitle'>
                    <span>Date & Time</span>
                    <span>Weight</span>
                    <span>Unit</span>
                    <span>Count</span>
                </div>
            )
        }       
        return (
            <Fragment>
                <div className="EC">
                    <Collapse isOpened={this.props.isOpened}>
                        <div className='ExpExerciseContainer'>
                            <div className='DetailsLogContainer'>
                                <span>Weight</span>                            
                                <input type='number' value={this.state.weight} onChange={this.weightChange}/>
                                <select value={this.state.unit} onChange={this.unitChange}>
                                    <option value='lbs'>lbs</option>
                                    <option value='kgs'>kgs</option>
                                </select>
                            </div>
                            <div className='DetailsLogContainer'>
                                <span>Count</span>
                                <input type='number' value={this.state.count} onChange={this.countChange}/>
                            </div>               
                            <div id="SaveLogBtn">
                                <button disabled={!(this.state.weight > 0 && this.state.count > 0)} type="button" className="btn btn-outline-dark" onClick={this.addLog}>Add</button>
                            </div>
                            {this.logTitle}
                            <Workouthistory></Workouthistory>
                        </div>
                    </Collapse>     
                </div>        
            </Fragment>
        )
    } 
}

const mapStateToProps = state => {
    return {
        workouts: state.workouts,
        logs: state.logs
    }
};

export default connect(mapStateToProps)(Workoutlog);