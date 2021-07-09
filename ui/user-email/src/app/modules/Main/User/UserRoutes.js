import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import SendEmailScreen from './screens/SendEmail';

const UserRoutes = ({
    setAppTitle,
    userName
}) => {
    return (
        <Switch>
            <Route
                exact
                path="/app/user/send-email"
                render={matchProps => <SendEmailScreen
                    {...matchProps}
                    setAppTitle={setAppTitle}
                    userName={userName}
                />}
            />
            <Redirect from="/app" to="/app/user/send-email" />
        </Switch>
    );
};

export default UserRoutes;
