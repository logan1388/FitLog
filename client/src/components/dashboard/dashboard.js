import React, { Component } from 'react';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.selectWorkOut = this.selectWorkOut.bind(this);
    }
    selectWorkOut = (workout) => {
        this.props.history.push('/Workout/'+workout);
    }
    render(){
        return (
            <div>
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
                        <button id="ChestBtn" type="button" className="btn btn-outline-dark" onClick={() => this.selectWorkOut('Chest')}>CHEST</button>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <button id="LegsBtn" type="button" className="btn btn-outline-dark" onClick={() => this.selectWorkOut('Leg')}>LEGS</button>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <button id="ShoulderBtn" type="button" className="btn btn-outline-dark" onClick={() => this.selectWorkOut('Shoulder')}>SHOULDER</button>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <button id="BackBtn" type="button" className="btn btn-outline-dark" onClick={() => this.selectWorkOut('Back')}>BACK</button>                
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <button id="BicepsBtn" type="button" className="btn btn-outline-dark" onClick={() => this.selectWorkOut('Biceps')}>BICEPS</button>                
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <button id="TricepsBtn" type="button" className="btn btn-outline-dark" onClick={() => this.selectWorkOut('Triceps')}>TRICEPS</button>                
                    </div>
                </div>
            </div>
        )
    }  
}

export default Dashboard;