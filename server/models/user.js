const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxLenght: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    refresh_token: {
        type: String,
        required: true,
        unique: true
    },
    _id: Number,

}, { _id: false, versionKey: false });

user.plugin(AutoIncrement);

module.exports = model('User', user);