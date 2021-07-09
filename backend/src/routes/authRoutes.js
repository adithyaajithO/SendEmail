const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const Admin = mongoose.model('Admin');

const router = express.Router();

// route for a user to signup
router.post('/signup', async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(422).send({ error: 'Must provide user ID, password' });
    }

    try {
        const user = new User({ userName, password, isActive: true });
        await user.save();
        console.log('buty')
        try {
            const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
            res.send({ token });
        } catch (e) {
            console.error(e);
            return res.status(422).send({ Error: err });
        }

    }
    catch (e) {
        return res.status(422).send({ error: "User Exists !!" });
    }
});

// route for a user to signin
router.post('/signin', async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(422).send({ error: 'Must provide user ID and password' });
    }

    const user = await User.findOne({ userName });
    if (!user) {
        return res.status(422).send({ error: 'User does not exist' });
    }
    if (!user.isActive) {
        return res.status(422).send({ error: 'User not authorized' });
    }

    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send({ token });
    }
    catch (e) {
        return res.status(422).send({ error: 'User does not exist' });
    }

});

// route for an admin to signup
router.post('/admin/signup', async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(422).send({ error: 'Must provide user ID, password' });
    }

    try {
        const admin = new Admin({ userName, password });
        await admin.save();
        console.log('buty')
        try {
            const token = jwt.sign({ admin: admin._id }, 'MY_SECRET_KEY');
            res.send({ token });
        } catch (e) {
            console.error(e);
            return res.status(422).send({ Error: err });
        }

    }
    catch (e) {
        return res.status(422).send({ error: "Admin Exists !!" });
    }
});

// route for an admin to signin
router.post('/admin/signin', async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(422).send({ error: 'Must provide user ID and password' });
    }

    const admin = await Admin.findOne({ userName });
    console.log(admin);
    if (!admin) {
        return res.status(422).send({ error: 'Admin does not exist' });
    }
    try {
        await admin.comparePassword(password);
        const token = jwt.sign({ admin: admin._id }, 'MY_SECRET_KEY');
        res.send({ token });
    }
    catch (e) {
        return res.status(422).send({ error: 'Admin does not exist' });
    }

});

module.exports = router;