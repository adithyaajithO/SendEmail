import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    formWrapper: {
        width: 400,
    }, container: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '2.5%',
    }, chipContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: theme.spacing(0.5),
        '& > *': {
            margin: theme.spacing(0.5),
        },
    }, li: {
        listStyleType: "none"
    }, button: {
        margin: theme.spacing(1),
    }, noInput: {
        display: 'none',
    }, modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }, paper: {
        display: 'flex',
        position: 'absolute',
        width: 600,
        minHeight: 500,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(5),
    }, close: {
        position: 'absolute',
        // alignSelf: 'flex-end',
        top: 5,
        right: 5,
    }, buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
    }, buttonRoot: {
        marginTop: theme.spacing(1)
    }
}));

const UpdateUserForm = ({
    updateUser,
    open,
    handleClose,
    user,
}) => {
    const classes = useStyles();

    return (
        <Modal
            open={open}
            className={classes.modal}
            aria-labelledby="update-user-title"
            aria-describedby="update-user-form"
        >
            <div className={classes.paper}>
                <IconButton className={classes.close} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <Typography id="update-user-title" variant="h4">
                    Update User Password
                </Typography>
                <div className={classes.formWrapper}>
                    <form
                        id="update-user-form"
                        noValidate
                        autoComplete="off"
                        onSubmit={updateUser}
                    >
                        <div className={classes.container}>
                            <TextField
                                id="userName"
                                defaultValue={user.userName}
                                label="User Name"
                                disabled
                                required
                            />
                            <TextField
                                id="password"
                                label="Password"
                                required
                            />
                            <Grid
                                container
                                spacing={1}
                                className={classes.buttonRoot}
                            >
                                <Grid item xs={6} className={classes.buttonContainer}>
                                    <Button
                                        className={classes.button}
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </Grid>
                                <Grid item xs={6} className={classes.buttonContainer}>
                                    <Button className={classes.button} onClick={handleClose}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </form >
                </div>
            </div>
        </Modal>
    )
};

export default UpdateUserForm;
