const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-token');

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


module.exports = {
    login,
};