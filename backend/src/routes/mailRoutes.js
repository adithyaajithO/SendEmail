const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const mailer = require('../helper/mailer');

const router = express.Router();

router.use(requireAuth);

router.post('/send-email', async (req, res) => {

    // get the mail params
    const { sender, receivers, subject, body } = req.body;

    //call the send mail function with the params
    return mailer.sendMail(sender, receivers, subject, body)
        .then(() => res.send({ status: 'Success' }))
        .catch(err => res.status(400).send({ error: err.message }));
});

module.exports = router;
