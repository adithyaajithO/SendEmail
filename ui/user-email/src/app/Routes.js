import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import AuthPage from './modules/Auth/AuthPage'
import MainLayout from './modules/Main/MainLayout';
import MainPage from './modules/Main/MainPage';
import rules from './rbac-rules';
import { setAppRequest } from './utils/appRequest';
import {
    signInAdmin,
    signInUser,
    signUpUser
} from './modules/Auth/apis/authenticationApis';

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userToken: null,
            loading: true,
            errorMessage: '',
            title: '',
            role: null,
            userName: '',
        };
        this.signIn = this.signIn.bind(this);
        this.handleSignInUser = this.handleSignInUser.bind(this);
        this.handleSignInAdmin = this.handleSignInAdmin.bind(this);
        this.handleSignUpUser = this.handleSignUpUser.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.appLoading = this.appLoading.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setErrorMessage = this.setErrorMessage.bind(this);
    }

    componentDidMount() {
        this.loadApp();
    }

    componentDidUpdate() {
        if (this.state.userToken) {
            setAppRequest(this.state.userToken);
        }
    }

    setTitle(title) {
        this.setState({
            title
        });
    }

    loadApp() {
        this.setState({
            userToken: localStorage.getItem('userToken'),
            role: localStorage.getItem('role')
        });
        this.appLoading(false);
    }

    signIn(userToken, role, userName) {
        this.appLoading(false);
        localStorage.setItem('userToken', userToken);
        localStorage.setItem('role', role);
        this.setState({
            userToken,
            role,
            userName
        });
    }

    //handle sign in for a user
    handleSignInUser(userName, password) {
        signInUser(userName, password)
            .then(({ data }) => {
                console.log('user signed in', data);
                this.signIn(data.token, rules.ROLE_USER.role, userName);
            })
            .catch(err => {
                console.log('user signed in err', err);
                this.appLoading(false);
                this.setErrorMessage('Something went wrong !!!')
            });
    }

    //handle sign in for an admin
    handleSignInAdmin(userName, password) {
        signInAdmin(userName, password)
            .then(({ data }) => {
                console.log('user signed in', data);
                this.signIn(data.token, rules.ROLE_ADMIN.role, userName);
            })
            .catch(err => {
                console.log('user signed in err', err);
                this.appLoading(false);
                this.setErrorMessage('Something went wrong !!!')
            });
    }

    //handle sign up for a user
    handleSignUpUser(userName, password) {
        signUpUser(userName, password)
            .then(({ data }) => {
                console.log('user signed up', data);
                this.signIn(data.token, rules.ROLE_USER.role, userName);
            })
            .catch(err => {
                console.log('user signup err', err);
                this.appLoading(false);
                this.setErrorMessage('Something went wrong !!!')
            });
    }

    //handle sign up for an admin
    handleSignUpAdmin(userName, password) {
        return null;
    }
    //sign out user/admin
    signOut() {
        this.appLoading(true);
        localStorage.removeItem('userToken');
        localStorage.removeItem('role');
        this.setState({
            userToken: null
        });
        this.appLoading(false);
    }

    appLoading(loading) {
        this.setState({
            loading
        });
    }

    setErrorMessage(errorMessage) {
        this.setState({
            errorMessage
        });
    }

    render() {
        const {
            userToken,
            loading,
            errorMessage,
            title,
            role,
            userName
        } = this.state;
        const isAuthorized = (userToken !== null && role !== null);

        return (
            <Switch>
                {!isAuthorized ?
                    <>
                        <Route
                            path="/auth"
                            render={(matchProps) => (
                                <AuthPage
                                    {...matchProps}
                                    handleSignInAdmin={this.handleSignInAdmin}
                                    handleSignInUser={this.handleSignInUser}
                                    handleSignUpAdmin={this.handleSignUpAdmin}
                                    handleSignUpUser={this.handleSignUpUser}
                                    appLoading={this.appLoading}
                                    setErrorMessage={this.setErrorMessage}
                                    errorMessage={errorMessage}
                                    loading={loading}
                                />
                            )}
                        />
                        <Redirect to="/auth" />
                    </> : <>
                        <MainLayout
                            title={title}
                            signOut={this.signOut}
                            role={role}
                        >
                            <Route
                                path="/app"
                                render={matchProps => (
                                    <MainPage
                                        {...matchProps}
                                        setAppTitle={this.setTitle}
                                        role={role}
                                        userName={userName}
                                    />
                                )}
                            />
                        </MainLayout>
                        <Redirect to="/app" />
                    </>}
            </Switch>
        );
    }
}

export default Routes;
