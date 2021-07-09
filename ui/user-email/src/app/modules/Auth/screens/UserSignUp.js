import React, { useState } from 'react';
import SignUp from '../components/SignUpForm';
import LoadingSpinner from '../../../components/LoadingSpinner';

const UserSignIn = ({
    handleSignUpUser,
    appLoading,
    setErrorMessage,
    errorMessage,
    loading,
}) => {
    const [userNameError, setUserNameError] = useState(false);

    const onSignUp = (event) => {
        event.preventDefault();
        if (!userNameError) {
            appLoading(true);
            const { userName, password } = event.target;
            handleSignUpUser(userName.value, password.value);
        } else {
            return;
        }
    }

    console.log('errM', errorMessage);

    return <>
        {
            loading ?
                <LoadingSpinner /> :
                <SignUp
                    onSignUp={onSignUp}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    userNameError={userNameError}
                    setUserNameError={setUserNameError}
                    title={'User Sign up'}
                />
        }
    </>
}

export default UserSignIn;
