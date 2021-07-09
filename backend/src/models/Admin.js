const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

adminSchema.pre('save', function (next) {
    const admin = this;
    console.log('wooot');
    // if (!admin.isModified('password')) {
    //     return next();
    // }
    bcrypt.genSalt(10, (e, salt) => {
        if (e) {
            return next(e);
        }

        bcrypt.hash(admin.password, salt, (e, hash) => {
            if (e) {
                return next(e);
            }
            admin.password = hash;
            console.log('admin ::', admin);
            next();
        });
    });
});

adminSchema.methods.comparePassword = function (candidatePassword) {
    const admin = this;

    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, admin.password, (e, isMatch) => {
            if (e) {
                return reject(e);
            }

            if (!isMatch) {
                return reject(false);
            }

            resolve(true);
        });
    });
}

mongoose.model('Admin', adminSchema);
