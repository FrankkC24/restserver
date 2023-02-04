const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


const validateJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'Access denied or not valid token',
        });
    };

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const user = await User.findById( uid );
        req.user = user;

        if ( !user ) {
            return res.status(401).json({
                msg: 'Not valid user',
            });
        };
        
        if ( !user.estado ) {
            return res.status(401).json({
                msg: 'Not valid user',
            });
        };

        next();
    } catch (error) {
        console.log( error );
        res.status(401).json({
            msg: 'Not valid token',
        });
    };

};


module.exports = {
    validateJWT,
};