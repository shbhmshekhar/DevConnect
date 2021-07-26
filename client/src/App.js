import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Fragment } from 'react';
import Navbar from './Components/Layout/Navbar';
import Landing from './Components/Layout/Landing';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
