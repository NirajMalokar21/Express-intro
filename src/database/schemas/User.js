const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        retuired: true,
        unique: true,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date(),
    },
});

module.exports = mongoose.model('users', UserSchema);