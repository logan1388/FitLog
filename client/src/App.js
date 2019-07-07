import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from '../src/components/layout/Landing';
import './App.css';
import register from '../src/components/auth/register';

class App extends Component{
  render(){
    return (
      <Router>
        <Route exact path='/' component={Landing} />
        <Route path='/Register' component={register} />
      </Router>
    )
  }
}

export default App;
