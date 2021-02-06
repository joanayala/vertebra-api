/*
    Path: /api/roles
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../shared/middlewares/validate-fields');

const { getRoles, createRol, updateRol, deleteRol } = require('./rol.controller');
const { validateJWT } = require('../shared/middlewares/validate-jwt');

const router = Router();

router.get('/', getRoles);
//router.get('/', validateJWT, getRoles);

router.post(
  '/',
  [
    //validateJWT,
    check('name', 'Rol name is required').not().isEmpty(),
    check('level', 'Rol level is required').not().isEmpty(),
    validateFields,
  ],
  createRol
);

router.put(
  '/:id',
  [
    //validateJWT,
    check('name', 'Rol name is required').not().isEmpty(),
    check('level', 'Rol level is required').not().isEmpty(),
    validateFields,
  ],
  updateRol
);

//router.delete('/:id', [validateJWT], deleteRol);
router.delete('/:id', deleteRol);

module.exports = router;