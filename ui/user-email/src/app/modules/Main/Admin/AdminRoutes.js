import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import ListUsersScreen from './screens/ListUsers';

const AdminRoutes = ({
    setAppTitle,
}) => {
    return (
        <Switch>
            <Route
                exact
                path="/app/admin/list-users"
                render={matchProps => <ListUsersScreen
                    {...matchProps}
                    setAppTitle={setAppTitle}
                />}
            />
            <Redirect from="/app" to="/app/admin/list-users" />
        </Switch>
    );
};

export default AdminRoutes;
