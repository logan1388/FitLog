import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.chestWO = this.chestWO.bind(this);
    }
    chestWO = () => {
        this.props.history.push('/Chest');
    }
    render(){
        return (
            <div>
                <Header></Header>
                <div id='WOHistContainer'>
                    <div>
                        <span>Previous Workout: </span>
                    </div>
                    <div>
                        <span>Last 5 Workouts</span>
                    </div>
                </div>
                <div className='row' id="WOOptions">
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <button id="ChestBtn" type="button" className="btn btn-outline-dark" onClick={this.chestWO}>CHEST</button>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <button id="LegsBtn" type="button" className="btn btn-outline-dark">LEGS</button>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <button id="ShoulderBtn" type="button" className="btn btn-outline-dark">SHOULDER</button>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <button id="BackBtn" type="button" className="btn btn-outline-dark">BACK</button>                
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <button id="BicepsBtn" type="button" className="btn btn-outline-dark">BICEPS</button>                
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <button id="TricepsBtn" type="button" className="btn btn-outline-dark">TRICEPS</button>                
                    </div>
                </div>
            </div>
        )
    }  
}

export default Dashboard;