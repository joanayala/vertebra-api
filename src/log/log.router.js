/*
    Path: /api/log
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../shared/middlewares/validate-fields');

const { getLogs, getLogs2 } = require('./log.controller');
const { validateJWT } = require('../shared/middlewares/validate-jwt');

const router = Router();

//router.get('/', getLogs);
router.get('/', validateJWT, getLogs);

//router.get('/action', getLogs2);
router.get('/action?q=', validateJWT, getRoles);

module.exports = router;