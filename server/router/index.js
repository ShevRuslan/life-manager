const express = require('express');
const router = express.Router();
const authClass = require('../modules/auth');
const auth = new authClass();
const passport = require('passport');

router.post('/login', auth.loginUser)
router.post('/register', auth.registerUser)
router.post('/token', auth.refreshToken)
router.get('/secret', passport.authenticate('jwt', { session: false }), auth.private);

module.exports = router;