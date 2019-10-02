import React, { Component } from 'react';
import { workoutHistory } from '../../store/actions';
import { connect } from 'react-redux';
import moment from 'moment';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.selectWorkOut = this.selectWorkOut.bind(this);
    }
    selectWorkOut = (workout) => {
        this.props.history.push('/Workout/'+workout);
    }

    componentDidMount(){
        let id = JSON.parse(localStorage.getItem('user')).data.user.id;
        this.props.dispatch(workoutHistory(id));
    }

    render(){     
        let category = this.props.workoutHistory.length > 0 ? this.props.workoutHistory[0].category : null;
        let date = this.props.workoutHistory.length > 0 ? this.props.workoutHistory[0].date : null;
        date = moment(date).format('MM/DD/YY');
        let history = [];
        let dashboard = '';
        if(this.props.workoutHistory.length > 0){
            history = this.props.workoutHistory.slice(0, 5).map(wh => 
            <div key={wh._id} className="PreviousWorkouts">{wh.category} - {moment(wh.date).format('MM/DD/YY')}</div>
            );
            dashboard = (
                <div>
                    <div id="PreviousWOContainer">
                        <div id="PreviousWorkoutLabel">Previous Workout:</div>
                        <div id="PreviousWorkout">{category} - {date}</div>
                    </div>
                    <div id="PreviousWOsContainer">
                        <div id="PreviousWorkoutsLabel">Last 5 Workouts:</div>
                        {history}
                    </div>
                </div>
            )
        }
        else{
            dashboard = (
                <div id="WelcomeNoteContainer">
                    <p><span>Welcome to FITLOG!</span></p>
                    <p><span>Enjoy your workout and log your fitness</span></p>
                </div>    
            )
        }
        return (
            <div>
                <div id='WOHistContainer'>
                    {dashboard}
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

const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        workoutHistory: state.workoutHistory
    }
}

export default connect(mapStateToProps)(Dashboard);