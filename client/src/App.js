import React, { Component } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Signup from './components/Register/Signup';
import Adminpanel from './components/AdminPanel/Adminpanel';
import Employeepanel from './components/AdminPanel/Employeepanel';
import EnterReview from './components/EmployeeReviews/EnterReview';
import ActiveEmployeeReviews from './components/EmployeeReviews/ActiveEmployeeReviews';
import AllEmployeesReviews from './components/AdminPanel/AllEmployeesReviews';
import Addadminreview from './components/AdminPanel/Addadminreview';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
         <div className="App">
           <Switch>
              <Route path="/" exact render = {() => <Signup />} />
              <Route path="/login" exact render = {() => <Login />} />
              <Route path="/adminview" exact render = {() => <Adminpanel />} />
              <Route path="/assigrev" exact render = {() => <Employeepanel />} />
              <Route path="/enterreview" exact render = {() => <EnterReview />} />
              <Route path="/activeemployeereview" exact render = {() => <ActiveEmployeeReviews />} />
              <Route path="/allemployeesreview" exact render = {() => <AllEmployeesReviews />} />
              <Route path="/addadminreview" exact render = {() => <Addadminreview />} />
           </Switch>
         </div>
      </Router>
    );
  }
}

export default App;
