import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../src/components/layout/Header';
import Landing from '../src/components/layout/Landing';
import './styles/App.scss';
import register from '../src/components/auth/register';
import dashboard from '../src/components/dashboard/dashboard';
import workout from './components/Workouts/workout';
import activity from './components/activity/activity';
import { connect } from 'react-redux';


class App extends Component{

  render(){
      return(
        <Router>
        <Header isAuthenticated = {this.props.isAuthenticated}></Header>
        <Route exact path='/' component={Landing} />
        <Route path='/Register' component={register} />
        <Route path='/Dashboard' component={dashboard}/>
        <Route path='/Workout/:id' component={workout}/>
        <Route path='/Activity' component={activity}/>
        </Router>
      )
  }
}

const mapStateToProps = state => {
  return {
      user: state.user,
      isAuthenticated: state.isAuthenticated
  }
};

export default connect(mapStateToProps)(App);