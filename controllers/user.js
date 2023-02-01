const { response, request } = require('express');


const User = require('../models/user');
const bcrypt = require('bcryptjs');

const getUser = async( req = request, res = response ) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { estado: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip( Number( from ))
            .limit( Number( limit ))
    ]);

    res.json({
        total,
        users,
    });
};

const postUser = async( req = request, res = response ) => {

    const { nombre, correo, password, role } = req.body;
    const user = new User( { nombre, correo, password, role } );
    
    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    // Save in database
    await user.save();

    // Resolve
    res.status(200).json(user);
};

const putUser = async( req= request, res = response ) => {
    const { id } = req.params;
    const { _id ,password, google, ...rest } = req.body;

    // TODO: validate from db
    if ( password ) {
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync( password, salt );
    };

    const userDB = await User.findByIdAndUpdate( id, rest ); 

    res.status(200).json({
        ok: true,
        userDB,
    });
};

const deleteUser = ( req = request, res = response ) => {

    const { id } = req.params;

    // Fisic delete
    // const user = User.findByIdAndDelete( id );

    const user = User.findByIdAndUpdate(id, { estado: false });

    res.json( user );
};

module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser,
};