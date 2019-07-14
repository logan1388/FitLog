import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from '../src/components/layout/Landing';
import './App.css';
import register from '../src/components/auth/register';
import dashboard from '../src/components/dashboard/dashboard';

class App extends Component{
  render(){
    return (
      <Router>
        <Route exact path='/' component={Landing} />
        <Route path='/Register' component={register} />
        <Route path='/Dashboard' component={dashboard}/>
      </Router>
    )
  }
}

export default App;
