import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import AdminScreen from './AdminPage';
import UserScreen from './UserPage';

const AuthPage = ({
  handleSignInUser,
  handleSignInAdmin,
  handleSignUpUser,
  handleSignUpAdmin,
  appLoading,
  setErrorMessage,
  errorMessage,
  loading,
}) => {

  return (
    <Switch>
      <Route
        path='/auth/user'
        render={props => <UserScreen
          {...props}
          handleSignInUser={handleSignInUser}
          handleSignUpUser={handleSignUpUser}
          appLoading={appLoading}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
          loading={loading}
        />}
      />
      <Route
        path='/auth/admin'
        render={props => <AdminScreen
          {...props}
          handleSignInAdmin={handleSignInAdmin}
          handleSignUpAdmin={handleSignUpAdmin}
          appLoading={appLoading}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
          loading={loading}
        />}
      />
      <Redirect from="/auth" exact to="/auth/user/login" />
    </Switch>
  );
};


export default AuthPage