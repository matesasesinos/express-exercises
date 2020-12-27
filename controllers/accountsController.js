const mongoose = require('mongoose');
const Users = mongoose.model('User');
const { body, validationResult } = require('express-validator');

exports.loginHome = (req, res) => {
  res.render('login/login', {
    pageTitle: 'Login',
    bodyClass: 'body-login',
    login: true,
  });
};

//crear cuenta
exports.signinForm = (req, res) => {
  res.render('login/signin', {
    pageTitle: 'Crear cuenta',
    bodyClass: 'body-signin',
    signin: true,
  });
};

exports.validateSignin = [
  body('name')
    .escape()
    .not()
    .isEmpty()
    .withMessage('El campo nombre no puede estar vació.'),
  body('email')
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage('El campo Email no puede estar vació.'),
  body('email').isEmail().withMessage('Ingrese un email valido.'),
  body('password')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('El campo contraseña no puede estar vació.'),
  body('repeat-password')
    .escape()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Debe repetir la contraseña'),
  body('repeat-password')
    .custom((value, { req }) => req.body.password === value)
    .withMessage('Las contraseñas no coiniciden.'),
  body('conditions')
    .not()
    .isEmpty()
    .withMessage('Debe aceptar los términos y condiciones'),
  (req, res, next) => {
    // console.log(req.session);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('danger', errors.array());
      res.render('login/signin', {
        pageTitle: 'Crear cuenta',
        bodyClass: 'body-signin',
        signin: true,
        old: req.body,
        messages: req.flash(),
      });
      return;
    }
    return next();
  },
];

exports.signinPost = async (req, res, next) => {
  const user = await Users(req.body);

  try {
    user.save();
    req.flash(
      'success',
      'El usuario se creo con exito, inicie sesión por favor.'
    );
    res.redirect('/iniciar-sesion');
  } catch (error) {
    req.flash('danger', error);
    res.render('login/signin', {
      pageTitle: 'Crear cuenta',
      bodyClass: 'body-signin',
      signin: true,
      old: req.body,
      messages: req.flash(),
    });
  }
};
