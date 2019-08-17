import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../src/components/layout/Header';
import Landing from '../src/components/layout/Landing';
import './App.css';
import register from '../src/components/auth/register';
import dashboard from '../src/components/dashboard/dashboard';
import workout from './components/Workouts/workout';

class App extends Component{
  render(){
    return (
      <Router>
      <Header></Header>
        <Route exact path='/' component={Landing} />
        <Route path='/Register' component={register} />
        <Route path='/Dashboard' component={dashboard}/>
        <Route 
          path='/Workout/:id' 
          component={workout}
          //render = {(props) => <chest workout = "Chest" {...props}/>}
          />
      </Router>
    )
  }
}

export default App;
