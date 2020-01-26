const express = require('express');
const router = express.Router();
const authClass = require('../modules/auth');
const { loginUser, registerUser, refreshToken, private } = new authClass();
const passport = require('passport');
const { check } = require('express-validator');

router.post('/login', [
  check('email')
    .exists().withMessage('Введите почту!')
    .isEmail().withMessage('Вы неправильно ввели почту!'),
  check('password')
    .exists().withMessage('Введите пароль!')
    .isLength({ min: 10 }).withMessage('Пароль должен быть больше 8 символов!')
], loginUser)

router.post('/register', [
  check('name').exists().withMessage('Имя не должно быть пустым!'),
  check('surname').exists().withMessage('Фамилия не должна быть пустой!'),
  check('email')
    .exists().withMessage('Введите почту!')
    .isEmail().withMessage('Вы неправильно ввели почту!'),
  check('password')
    .exists().withMessage('Введите пароль!')
    .isLength({ min: 8 }).withMessage('Пароль должен быть больше 8 символов!')
] ,registerUser)

router.post('/token', refreshToken)

router.get('/secret', passport.authenticate('jwt', { session: false }), private);

module.exports = router;