import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';

import { getLinks } from '../../../../utils/sideBarUtil';

const useStyles = makeStyles(theme => ({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    nested: {
        paddingLeft: theme.spacing(4),
    },
}))

const AppDrawer = ({
    role,
}) => {
    const classes = useStyles();
    const links = getLinks(role);
    const [openProcessed, setOpenProcessed] = useState(false);
    const [openUpload, setOpenUpload] = useState(false);

    const handleOpenProcessed = () => setOpenProcessed(!openProcessed);
    const handleOpenUpload = () => setOpenUpload(!openUpload);

    return <div>
        <Divider />
        <List>
            {links.map((link, indx) => (<>
                <ListItem
                    button
                    key={link.text}
                    component={link.component}
                    to={link.to}
                    onClick={link.text === 'Processed Reports' ? handleOpenProcessed : link.text === 'Upload Reports' ? handleOpenUpload : null}
                    tabIndex={indx}
                >
                    <ListItemIcon>
                        {link.icon}
                    </ListItemIcon>
                    <ListItemText primary={link.text} />
                </ListItem>
                {link.nested.length !== 0 ?
                    link.nested.map((nestedLink, idx) => (
                        <Collapse
                            in={link.text === 'Processed Reports' ? openProcessed : link.text === 'Upload Reports' ? openUpload : null}
                            timeout="auto"
                            unmountOnExit
                        >
                            <List component="div" disablePadding>
                                <ListItem
                                    button
                                    to={nestedLink.to}
                                    component={nestedLink.component}
                                    className={classes.nested}
                                    tabIndex={idx}
                                >
                                    <ListItemIcon>
                                        {nestedLink.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={nestedLink.text} />
                                </ListItem>
                            </List>
                        </Collapse>
                    ))
                    :
                    null}
            </>))}
        </List>
    </div>
};

export default AppDrawer;