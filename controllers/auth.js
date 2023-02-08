const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const { generateJWT } = require('../helpers/generate-token');
const { googleVerify } = require('../helpers/google-verify');

const login = async( req = request, res = response ) => {

    const { correo, password } = req.body;

    try {
        // Verify existent email
        const user = await User.findOne({ correo });
        if ( !user ) {
            return res.status(400).json({
                msg: 'Incorrect user or password - email',
            });
        };

        // Active user
        if ( !user.estado ) {
            return res.status(400).json({
                msg: 'Incorrect user or password - estado: false',
            });
        };

        // Verifiy password
        const verifyPass = bcrypt.compareSync( password, user.password );
        if ( !verifyPass ) {
            return res.status(400).json({
                msg: 'Incorrect user or password - password',
            });
        };

        // Create JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Contact with the admin',
        });
    };


};

const googleSingIn = async( req = request, res = response ) => {

    const { id_token } = req.body;
    
    try {

        const { nombre, img, correo } = await googleVerify( id_token );

        let user = await User.findOne({ correo });

        // Create user in case of this does not exist
        if ( !user ) {
            const data = {
                nombre,
                correo,
                password: 'Google User',
                img,
                role: 'USER_ROLE',
                google: true,
            };

            user = new User( data );
            await user.save();
        };

        // Verify if this user is a bloqued or deleted user
        if ( user.estado === false ) {
            return res.status(401).json({
                msg: 'Access denied',
            });
        };

        // Generate JWT
        const token = await generateJWT( user.id );
        
        res.status(200).json({
            user,
            token,
        });

        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            msg: 'Unexpected error',
        });
    };

};


module.exports = {
    login,
    googleSingIn,
};