import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { Link } from 'react-router-dom';
import rules from '../rbac-rules';

export const getLinks = role => {
    const adminLinks = [
        {
            text: 'List Users',
            to: role ? `/app/admin/list-users` : '',
            icon: <ListAltOutlinedIcon />,
            component: Link,
            nested: [],
        },
    ];
    const userLinks = [
        {
            text: 'Send Email to contacts',
            to: role ? `/app/user/send-email` : '',
            icon: <EmailOutlinedIcon />,
            component: Link,
            nested: [],
        },
    ];

    switch (role) {
        case rules.ROLE_ADMIN.role:
            return adminLinks;
        case rules.ROLE_USER.role:
            return userLinks;
        default:
            return [];
    }

};