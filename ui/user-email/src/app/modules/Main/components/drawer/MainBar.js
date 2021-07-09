import React, { useState } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import DialogBox from '../dialog/DialogBox';

const MainBar = ({
    signOut,
    title,
    handleDrawerOpen,
    classes,
    open,
    role
}) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleDialogClose = () => {
        setOpenDialog(false);
    }

    const handleDialogOpen = () => {
        setOpenDialog(true);
    }

    return <>
        <CssBaseline />
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <DialogBox
                open={openDialog}
                action={signOut}
                dialogTitle='Do you want to sign out'
                handleClose={handleDialogClose}
            />
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={handleDrawerOpen}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {title}
                </Typography>
                {/* <Tooltip title="Logged in user" aria-label="login-user">
                    <Chip
                        size="small"
                        color="default"
                        label={phoneNumber}
                        icon={<FaceIcon />}
                        clickable
                    />
                </Tooltip> */}
                <Tooltip title="Sign Out" aria-label="sign-out">
                    <IconButton onClick={handleDialogOpen} color="inherit">
                        <ExitToAppIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    </>
};

export default MainBar;