const { request, response } = require("express");

const isAdmin = ( req = request, res = response, next ) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'The token must first be validated',
        });
    };

    const { role, nombre } = req.user;

    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ nombre } is not admin`,
        });
    };

    next();
};

const hasRole = ( ...roles ) => {

    return ( req = request, res = response, next ) => {
        
        if ( !req.user ) {
            return res.status(500).json({
                msg: 'The token must first be validated',
            });
        };

        if ( !roles.includes( req.user.role )) {
            return res.status(401).json({
                msg: `One of these roles is required to do this: ${ roles }`,
            });
        };
        next();
    };
};

module.exports = {
    isAdmin,
    hasRole,
};