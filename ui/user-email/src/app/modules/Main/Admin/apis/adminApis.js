import appRequest from '../../../../utils/appRequest';

//api to get all users
export const getAllUsersApi = () => {
    return appRequest.get('/users');
}

//api to deactivate a registered user
export const deactivateUserApi = userId => {
    console.log(userId);
    return appRequest.put('/users',
        {
            isActive: false
        }, {
        headers: {
            'User_id': userId
        }
    });
}
