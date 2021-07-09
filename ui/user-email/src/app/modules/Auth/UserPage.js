import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import UserSignInScreen from './screens/UserSignIn';
import UserSignUpScreen from './screens/UserSignUp';

const UserPage = ({
    handleSignInUser,
    handleSignUpUser,
    appLoading,
    setErrorMessage,
    errorMessage,
    loading,
}) => {

    return (
        <Switch>
            {/* <Redirect from="/auth" exact to="/auth/login" /> */}
            <Route
                path='/auth/user/login'
                render={props => <UserSignInScreen
                    {...props}
                    handleSignInUser={handleSignInUser}
                    appLoading={appLoading}
                    setErrorMessage={setErrorMessage}
                    errorMessage={errorMessage}
                    loading={loading}
                />}
            />
            <Route
                path='/auth/user/signup'
                render={props => <UserSignUpScreen
                    {...props}
                    handleSignUpUser={handleSignUpUser}
                    appLoading={appLoading}
                    setErrorMessage={setErrorMessage}
                    errorMessage={errorMessage}
                    loading={loading}
                />}
            />
        </Switch>
    );
};


export default UserPage;