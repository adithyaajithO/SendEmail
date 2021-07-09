import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AppDrawer from './AppDrawer';

const DrawerWrapper = ({
    open,
    handleDrawerClose,
    classes,
    role,
}) => {
    const theme = useTheme();

    return <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
            paper: classes.drawerPaper,
        }}
    >
        <div className={classes.drawerHeader}>
            {/* <div className={classes.logoBox}> */}
            {/* </div> */}
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
        </div>
        <AppDrawer role={role} />
    </Drawer>
};

export default DrawerWrapper;