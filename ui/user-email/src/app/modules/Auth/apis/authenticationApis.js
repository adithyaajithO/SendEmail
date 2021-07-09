import axios from 'axios';


const authRequest = axios.create({
    baseURL: 'http://localhost:3001'
});
//sign in user
export const signInUser = (userName, password) => (
    authRequest.post('/signin', {
        userName,
        password
    })
);

//sign up user
export const signUpUser = (userName, password) => (
    authRequest.post('/signup', {
        userName,
        password
    })
);

//sign in admin
export const signInAdmin = (userName, password) => (
    authRequest.post('/admin/signin', {
        userName,
        password
    })
);

//sign up admin
export const signUpAdmin = (userName, password) => (
    authRequest.post('/admin/signup', {
        userName,
        password
    })
);
