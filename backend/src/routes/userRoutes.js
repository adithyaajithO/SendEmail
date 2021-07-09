const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');

const User = mongoose.model('User');

const router = express.Router();

router.use(requireAuth);

router.get('/users', async (req, res) => {
    console.log('req', req);
    await User.find({}, (err, result) => {
        if (err) {
            res.status(422).send({ error: err });
        }
        else {
            res.send(result);
        }
    });
})

router.put('/users', async (req, res) => {
    const { user_id } = req.headers;
    console.log('user_id', user_id);

    let query = {};

    for (const property in req.body) {
        if (typeof req.body[property] !== undefined) {
            query[property] = req.body[property];
        }
    }
    console.log(query);

    if (query === {}) {
        return res.status(422).send({ error: 'request body should not be empty' });
    }

    await User.findOneAndUpdate({ _id: user_id }, query, async (err, result) => {
        if (err) {
            return res.status(422).send({ error: err.message });
        } else {
            if (result) {
                res.send({ status: 'Success' });
            }
            else {
                return res.status(404).send({ error: 'user not found' });
            }
        }
    });
})

router.delete('/users', async (req, res) => {
    const { user_id } = req.headers;

    await User.findById(user_id, async (err, result) => {
        if (err) {
            return res.status(422).send({ error: err.message });
        } else {
            if (result) {
                await User.deleteOne({ _id: result._id }, async (err) => {
                    if (err) {
                        return res.status(422).send({ error: err.message });
                    }
                    else {
                        res.send({ status: 'Success' });
                    }
                })
            }
            else {
                return res.status(404).send({ error: 'user not found' });
            }
        }
    });
})


module.exports = router;