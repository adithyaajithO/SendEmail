import React, { useState } from 'react';
import SignIn from '../components/SignInForm';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { Link } from 'react-router-dom';

const UserSignIn = ({
    handleSignInUser,
    appLoading,
    setErrorMessage,
    errorMessage,
    loading,
}) => {
    const [userNameError, setUserNameError] = useState(false);

    const onSignIn = (event) => {
        event.preventDefault();
        if (!userNameError) {
            appLoading(true);
            const { userName, password } = event.target;
            handleSignInUser(userName.value, password.value);
        } else {
            return;
        }
    }

    console.log('errM', errorMessage);
    const AdminSignInLink = () => <Link to='/auth/admin/signin' variant="body2">
        {"Go to admin Login page"}
    </Link>;
    return <>
        {
            loading ?
                <LoadingSpinner /> :
                <SignIn
                    onSignIn={onSignIn}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    userNameError={userNameError}
                    setUserNameError={setUserNameError}
                    title={'User Sign in'}
                    adminSignIn={AdminSignInLink}
                />
        }
    </>
}

export default UserSignIn;
