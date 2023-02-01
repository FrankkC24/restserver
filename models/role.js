
const { Schema, model } = require('mongoose');

const RolSchema = new Schema({
    role: {
        type: String,
        required: [true, 'The rol is required']
    }
});


module.exports = model('Role', RolSchema);