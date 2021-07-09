import React from "react";
import AdminRoutes from './Admin/AdminRoutes';
import UserRoutes from './User/UserRoutes';
import rules from '../../rbac-rules';


const RenderRoutes = ({
    routeProps,
    role,
}) => {
    switch (role) {
        case rules.ROLE_ADMIN.role:
            return <AdminRoutes
                {...routeProps}
            />
        case rules.ROLE_USER.role:
            return <UserRoutes
                {...routeProps}
            />
        default:
            return null;
    }
};

export default RenderRoutes;