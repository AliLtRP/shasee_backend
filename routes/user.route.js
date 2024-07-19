const { register, login, checkUser } = require('../model/user.model');
const express = require('express');
const router = express.Router();

router.post('/register', register);
router.post('/login',login);
router.get('/check', checkUser);


module.exports = router;