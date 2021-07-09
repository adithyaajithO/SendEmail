import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MainBar from './components/drawer/MainBar';
import DrawerWrapper from './components/drawer/DrawerWrapper';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logoStyle: {
        transform: `scale(0.75) translate(${theme.spacing(6)}px, 0px)`,
        overflow: 'visible',
    },
    chipStyle: {
        margin: `0 ${theme.spacing(2)}px 0 0`
    }
}));

const Layout = ({
    children,
    signOut,
    title,
    role,
}) => {
    const classes = useStyles();
    const [open, setOpenDrawer] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    return (
        <div className={classes.root}>
            <MainBar
                handleDrawerOpen={handleDrawerOpen}
                signOut={signOut}
                title={title}
                classes={classes}
                open={open}
                role={role}
            />
            <DrawerWrapper
                open={open}
                handleDrawerClose={handleDrawerClose}
                classes={classes}
                role={role}
            />
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {children}
            </main>
        </div>
    )
};

export default Layout;