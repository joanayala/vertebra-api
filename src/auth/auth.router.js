/*
    Path: '/api/login'
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { login, logout } = require('./auth.controller');
const { validateFields } = require('../shared/middlewares/validate-fields');

const router = Router();

router.post('/', [check('username', 'El email es obligatorio').not().isEmpty(), check('password', 'El password es obligatorio').not().isEmpty(), validateFields], login);
router.delete('/:id', logout);

module.exports = router;
