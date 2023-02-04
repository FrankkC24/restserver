
const { Schema, model } = require('mongoose');

const SchemaUser = Schema({
    nombre: {
        type: String,
        required: [true, 'The name is required'],
    },
    correo: {
        type: String,
        required: [true, 'The email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'The password is required'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

SchemaUser.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
};


module.exports = model('Usuario', SchemaUser);