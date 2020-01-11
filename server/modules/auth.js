const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const config = require('../config/config.json');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
};

const strategy = new JWTStrategy(jwtOptions, (payload, next) => {
  User.findOne({ _id: payload.id }, (err, user) => {
    if (err) return next(err);
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
});
passport.use(strategy);

module.exports = class {
  registerUser = async (request, response) => {
    const { name, surname, email, password } = request.body;
    if (name && password && surname && email) {
      const user = await User.findOne({ email: email });
      if (user) {
        response.status(401).json({ message: 'Пользователь существует!' });
      }
      const countUsers = await User.count({});
      const lastId = countUsers + 1;
      const token = jwt.sign({ id: lastId }, config.secret, { expiresIn: config.tokenLife });
      const refreshToken = jwt.sign({ id: lastId }, config.refreshTokenSecret, {
        expiresIn: config.refreshTokenLife
      });
      let newUser = new User({
        name: name,
        surname: surname,
        email: email,
        password: bcrypt.hashSync(password, salt),
        refresh_token: refreshToken
      });
      try {
        // eslint-disable-next-line no-unused-vars
        const saveUser = await newUser.save();
        response.status(200).json({
          status: 'Регистрация прошла успешно!',
          success: true,
          token: token,
          refreshToken: refreshToken
        });
      } catch (err) {
        response.status(500).json({ message: 'Регистрация провалилась.' });
      }
    }
  };
  loginUser = async (request, response) => {
    const { email, password } = request.body;
    if (email && password) {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          response.status(401).json({ message: 'Пользователь не найден.' });
        }

        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: config.tokenLife });
          const refreshToken = jwt.sign({ id: user.id }, config.refreshTokenSecret, {
            expiresIn: config.refreshTokenLife
          });
          user.refresh_token = refreshToken;
          await user.save();
          const res = {
            'status': 'Logged in',
            'success': true,
            'token': token,
            'refreshToken': refreshToken
          };
          response.status(200).json(res);
        }
      } catch (err) {
        response.status(401).json({ message: `Ошибка с базой данных. ${err}` });
      }
    } else {
      response.status(401).json({ message: 'password not match' });
    }
  };
  refreshToken = async (request, response) => {
    const { refreshToken } = request.body;
    try {
      const decoded = jwt.verify(refreshToken, config.secret);
      const timeLifeRefToken = decoded.exp;
      const currentTime = new Date().getTime() / 1000;
      if (currentTime > timeLifeRefToken) {
        response.status(401).json({ 'Error': 'TOKEN_EXPIRED' });
      } else {
        const user = await User.findOne({ refresh_token: refreshToken });
        if (user) {
          const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: config.tokenLife });
          const refreshToken = jwt.sign({ id: user.id }, config.refreshTokenSecret, {
            expiresIn: config.refreshTokenLife
          });
          const res = {
            'token': token,
            'refreshToken': refreshToken
          };
          user.refresh_token = refreshToken;
          await user.save();
          response.status(200).json(res);
        }
        response.status(404).send('Пользователь не найден');
      }
    } catch (err) {
      response.status(401).json({ message: `${err}` });
    }
  };
  private = async (request, response) => {
    response.status(200).json({ success: 'is private! token very nice' });
  };
};
