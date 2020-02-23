import React from 'react';
import { Container } from 'reactstrap';
import './App.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import Dashboard from './components/Dashboard';
//UTILITIES
import PrivateRoute from './utils/PrivateRoute';
import NoMatch from './components/NoMatch';
//Counsoler Routes
import AddCounselor from './components/AddCounsoler';
import MyCounsolerProfile from './components/MyCounselorProfile';
import EditMyCounsolerProfile from './components/EditMyCounsolerProfile';
import allCounselor from './components/ViewCounsolers';

//APPOINMENT ROUTES
import AddAppoinments from './components/AddAppoinments';
import MyAppoinments from './components/ViewAppoinments';

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/register' component={Register} />
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <PrivateRoute path='/profile' component={UserProfile} />
        <PrivateRoute path='/addCounselor' component={AddCounselor} />
        <PrivateRoute path='/myCounselorProfile' component={MyCounsolerProfile} />
        <PrivateRoute path='/editmyCounselorProfile/:id' component={EditMyCounsolerProfile} />
        <PrivateRoute path='/viewCounselor' component={allCounselor} />

        <PrivateRoute path='/addAppoinments' component={AddAppoinments} />
        <PrivateRoute path='/myAppoinments' component={MyAppoinments} />

        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
