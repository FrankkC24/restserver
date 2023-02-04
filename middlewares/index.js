const validateField = require('../middlewares/validate');
const validateJWT = require('../middlewares/validate-jwt');
const validateRole = require('../middlewares/validate-role');

module.exports = {
    ...validateField,
    ...validateJWT,
    ...validateRole,
};