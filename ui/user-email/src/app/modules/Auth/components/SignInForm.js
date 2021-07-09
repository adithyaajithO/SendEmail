import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { emailValidation } from '../../validation/textInputValidations';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to="/auth/user/login">
                User Email App
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn({
    onSignIn,
    errorMessage,
    setErrorMessage,
    title = 'Sign in',
    adminSignIn: AdminSignInLink = () => null,
    userNameError,
    setUserNameError,
}) {
    const classes = useStyles();

    const handleUserNameChange = ({ target: { value } }) => {
        setErrorMessage('');
        if (emailValidation(value)) {
            setUserNameError(false);
        } else {
            setUserNameError(true);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {title}
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={onSignIn}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        label="Username"
                        name="userName"
                        placeholder="Enter your registered username"
                        onChange={handleUserNameChange}
                        error={userNameError}
                        helperText={userNameError && 'Enter valid email id'}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        onChange={() => setErrorMessage('')}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container spacing={3}>
                        <Grid item>
                            <Link to='/auth/user/signup' variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                        <Grid item>
                            <AdminSignInLink />
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Typography
                    variant="body2"
                    color="error"
                    align="center"
                >
                    {errorMessage}
                </Typography>
            </Box>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}