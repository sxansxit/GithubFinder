import React, {Component, Fragment} from 'react';
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from './components/users/User';

import GithubState from "./context/github/GithubState";

class App extends Component {

    state = {
        loading: false,
        users: [],
        user: {},
        repos: [],
        alert: null
    };

    async componentDidMount() {
        this.setState({loading: true});
        const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({users: res.data, loading: false});
    }

    // Get single Github user
    getUser = async username => {
        this.setState({loading: true});
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({user: res.data, loading: false});
    };

    // Get users repos
    getUserRepos = async username => {
        this.setState({loading: true});
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=10&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({repos: res.data, loading: false});
    };

    // Set Alert
    setAlert = (msg, type) => {
        this.setState({alert: {msg, type}});

        setTimeout(() => this.setState({alert: null}), 5000)
    };

    render() {

        const {loading, users, user, alert, repos} = this.state;

        return (
            <GithubState>
                <Router>
                    <div className='App'>
                        <Navbar/>
                        <div className="container mt-3">
                            <Alert alert={alert}/>
                            <Switch>
                                {/*Home Page*/}
                                <Route exact path="/" render={props => (
                                    <Fragment>
                                        <Search setAlert={this.setAlert}/>
                                        {
                                            users.length > 0 ? (
                                                    <Users loading={loading} users={users}/>)
                                                : <h6 className='text-center mt-5'> No users found!</h6>
                                        }
                                    </Fragment>
                                )}>
                                </Route>
                                {/*About Page*/}
                                <Route exact path="/about" component={About}/>
                                {/*User Details Page*/}
                                <Route exact path="/user/:login" render={props => (
                                    <User {...props}
                                          getUser={this.getUser}
                                          getUserRepos={this.getUserRepos}
                                          user={user}
                                          repos={repos}
                                          loading={loading}
                                    />
                                )}/>
                            </Switch>

                        </div>
                    </div>
                </Router>
            </GithubState>
        );
    }
}

export default App;