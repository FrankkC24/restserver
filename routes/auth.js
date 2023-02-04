const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateField } = require('../middlewares/validate');

const router = new Router();
router.post('/login', [
    check('correo', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateField,
], login);


module.exports = router;