const AWS = require('aws-sdk'); // loading aws sdk

const config = new AWS.Config({
    accessKeyId: 'AKIA2C7QFUJLMLYLEYOU', secretAccessKey: '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', region: 'ap-south-1'
});


module.exports = {
    config
};
