import React, { Component, Fragment } from 'react';
import {Collapse} from 'react-collapse';
import Workouthistory from './workouthistory';
import axios from 'axios';
import { connect } from 'react-redux';

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
    }

    componentDidMount = () => {
        this.getInitialState();
        if(this.props.logs.length > 0){
            this.logs = Object.keys(this.props.logs)
            .map(key => {
                return [...Array(this.props.logs[key])].map(() => {
                    return (<Workouthistory
                        key = {key}
                        log = {this.props.logs[key]}></Workouthistory>)
                });      
            });
        } else {
            this.logs = <div></div>
        }   
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
        this.state.log.push({date:timestamp, weight: this.state.weight, unit: this.state.unit, count: this.state.count})
        this.setState({log: this.state.log});
        this.getInitialState();
        axios.post('http://localhost:5000/api/workoutlog/',{
            "category": this.props.category,
            "name": this.props.children,
            "date": timestamp,
            "weight": this.state.weight,
            "unit": this.state.unit,
            "count": this.state.count
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    render(){
        
        return (
            <Fragment>
                {/* <div className='ExerciseContainer'>
                        <span onClick={this.props.clicked}>{this.props.children}</span> */}
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
                                {this.logs}          
                            </div>
                        </Collapse>     
                        </div>        
                    {/* </div> */}
            </Fragment>
        )
    } 
}

const mapStateToProps = state => {
    console.log(state.logs);
    return {
        logs: state.logs
    }
};

export default connect(mapStateToProps)(Workoutlog);