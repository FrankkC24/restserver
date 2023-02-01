
const { Router } = require('express');
const { getUser, putUser, postUser, deleteUser } = require('../controllers/user');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/validate');
const { isValidRole, isValidEmail, isValidMongoId } = require('../helpers/db-validators');



const router = new Router();

router.get('/', getUser);

router.put('/:id', [
    check('id', 'Not valid ID').isMongoId(),
    check('id').custom( isValidMongoId ),
    check('role').custom( isValidRole ),
    validateField
], putUser);

router.post('/', [
    check('nombre', 'Not valid name or empty').not().isEmpty(),
    check('password', 'Password must be longer than 6 characters').isLength({ min: 6 }),
    check('correo', 'Not valid email').isEmail(),
    check('correo').custom( isValidEmail ),
    // check('role', 'Not valid rol').isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check('role').custom( isValidRole ),
    validateField,
], postUser);

router.delete('/:id', [
    check('id', 'Not valid ID').isMongoId(),
    check('id').custom( isValidMongoId ),
], deleteUser);


module.exports = router;