import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import AdminSignInScreen from './screens/AdminSignIn';

const AdminPage = ({
    handleSignInAdmin,
    appLoading,
    setErrorMessage,
    errorMessage,
    loading,
}) => {

    return (
        <Switch>
            {/* <Redirect from="/auth" exact to="/auth/login" /> */}
            <Route
                path='/auth/admin/signin'
                render={props => <AdminSignInScreen
                    {...props}
                    handleSignInAdmin={handleSignInAdmin}
                    appLoading={appLoading}
                    setErrorMessage={setErrorMessage}
                    errorMessage={errorMessage}
                    loading={loading}
                />}
            />
            {/* <Route
        path='/auth/signup'
        render={props => <AdminScreen
          {...props}
          signIn={signIn}
          appLoading={appLoading}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
          loading={loading}
        />}
      /> */}
        </Switch>
    );
};


export default AdminPage;