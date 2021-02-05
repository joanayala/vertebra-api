/*
    Path: /api/users
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../shared/middlewares/validate-fields');

const { getUsers, createUser, updateUser, deleteUser } = require('./user.controller');
const { validateJWT } = require('../shared/middlewares/validate-jwt');

const router = Router();

// router.get('/', getUsers);
router.get('/', validateJWT, getUsers);

router.post(
  '/',
  [
    validateJWT,
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('rol_id', 'Rol is required').not().isEmpty(),
    validateFields,
  ],
  createUser
);

router.put(
  '/:id',
  [
    validateJWT,
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('rol_id', 'Rol is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty(),
    validateFields,
  ],
  updateUser
);

router.delete('/:id', [validateJWT], deleteUser);

module.exports = router;
