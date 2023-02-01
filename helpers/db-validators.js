const Role = require('../models/role');
const User = require('../models/user');


const isValidRole = async( role = '' ) => {
    const existsRole = await Role.findOne({ role });
    if ( !existsRole ) {
        throw new Error(`Role ${ role } not exists in DB`);
    };
};

const isValidEmail = async( email = '') => {
    const existsEmail = User.findOne({ email });
    if ( !existsEmail ) {
        throw new Error('Email already used');
    };
};

const isValidMongoId = async( id = '') => {
    const existsId = User.findById(id);
    if ( !existsId ) {
        throw new Error(`ID: ${id} not exists`,);
    };
};

module.exports = {
    isValidRole,
    isValidEmail,
    isValidMongoId,
};