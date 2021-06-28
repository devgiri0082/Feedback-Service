import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Feedback from './Feedback';
import Login from './Login';
import Main from './Main';
import Signup from './Signup';
import User from "./User";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/user/:id">
                    <User />
                </Route>
                <Route path="/feedback/:id">
                    <Feedback />
                </Route>
            </Switch>
        </Router>
    )
}
