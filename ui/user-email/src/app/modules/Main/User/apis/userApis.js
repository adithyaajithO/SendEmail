import appRequest from '../../../../utils/appRequest';

export const sendEmailApi = body => {
    return appRequest.post('/send-email', {
        ...body
    });
}
