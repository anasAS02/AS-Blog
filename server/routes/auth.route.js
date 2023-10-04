const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth.controllers');


router.route('/login')
                .post(authControllers.login);

router.route('/register')
                .post(authControllers.register);

router.route('/logout')
                .post(authControllers.logout);


module.exports = router;