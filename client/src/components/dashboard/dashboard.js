import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <span className='NavTitle h2'><Link to='/'>FITLOG</Link></span>
            </nav>
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
                    <button id="ChestBtn" type="button" className="btn btn-outline-dark">CHEST</button>
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
            </div>
        </div>
    )
}

export default Dashboard;