const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    token: String,
    token_expire: Date,
    created: Date,
    avatar: String,
    active:{
        type: Boolean,
        default: 0
    }
});

module.exports = mongoose.model('User', userSchema);