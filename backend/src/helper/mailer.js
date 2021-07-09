const AWS = require('aws-sdk'); // loading aws sdk

const { config } = require('../aws-exports');

AWS.config.update(config); // updating config

// creating an html template which accepts data and returns a string formatted as HTML
const htmlTemplate = data => {
    return `
      <p>data</p>
    `;
};

// defining a function which accepts the sender, list of receivers, subject
// and data to send the mail 
module.exports.sendMail = (sender, receivers, subject, data) => {
    const params = {
        Destination: {
            ToAddresses: [receivers]
        },
        Message: {
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            },
            Body: {
                Html: {
                    Charset: "UTF-8",
                    // Data: htmlTemplate(data),
                    Data: data
                }
            }
        },
        Source: sender,
    };

    const sendPromise = new AWS.SES().sendEmail(params).promise();

    return sendPromise
        .then((data) => data)
        .catch((err) => {
            throw new Error(err);
        });
};