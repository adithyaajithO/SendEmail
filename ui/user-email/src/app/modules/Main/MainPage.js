import React from "react";
import { Switch } from "react-router-dom";
import RenderRoutes from './RenderRoutes';

const MainPage = ({
    setAppTitle,
    role,
    userName
}) => {

    const routeProps = {
        setAppTitle,
        userName
    };

    return (
        <Switch>
            <RenderRoutes
                role={role}
                routeProps={routeProps}
            />
        </Switch>
    );
};


export default MainPage;