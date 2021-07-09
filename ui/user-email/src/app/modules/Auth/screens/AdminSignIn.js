import React, { useState } from 'react';
import SignIn from '../components/SignInForm';
import LoadingSpinner from '../../../components/LoadingSpinner';

const AdminSignIn = ({
    handleSignInAdmin,
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
            handleSignInAdmin(userName.value, password.value);
        } else {
            return;
        }
    }

    console.log('errM', errorMessage);

    return <>
        {
            loading ?
                <LoadingSpinner /> :
                <SignIn
                    onSignIn={onSignIn}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    title={'Admin Sign in'}
                    userNameError={userNameError}
                    setUserNameError={setUserNameError}
                />
        }
    </>
}

export default AdminSignIn;
