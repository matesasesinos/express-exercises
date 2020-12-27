const passport = require('passport');
const mongoose = require('mongoose');
const Users = mongoose.model('User');
const { body, validationResult } = require('express-validator');


//revisar si esta autenticado el usuario
exports.verifyAuth = (req,res,next) => {
  //reviso
  if(req.isAuthenticated()) {
      return next();
  }
  //redireccionar
  res.redirect('/iniciar-sesion');
}

//formulario de login
exports.loginHome = (req,res,next) => {
  if(req.user) {
    res.redirect('/user/panel')
  }
  res.render('login/login', {
    pageTitle: 'Login',
    bodyClass: 'body-login',
    login: true,
  });
};


//valiamos formulario de login
exports.validateLogin = [
  body('email').normalizeEmail().not().isEmpty().withMessage('El campo email no puede estar vació.'),
  body('email').isEmail().withMessage('El formato del email no es valido'),
  body('password').escape().trim().not().isEmpty().withMessage('La contraseña no puede estar vacía'),
  (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('danger', errors.array());
      res.render('login/login', {
        pageTitle: 'Login',
        bodyClass: 'body-login',
        login: true,
        old: req.body,
        messages: req.flash()
      });
      return;
    }
    return next();
  }
]
//validamos el usuario
exports.loginUser = passport.authenticate('local', {
  successRedirect: '/user/panel',
  failureRedirect: '/iniciar-sesion',
  failureFlash: true,
  badRequestMessage: 'Faltan los datos de inicio de sesión'
});

//formulario de crear cuenta
exports.signinForm = (req, res) => {
  if(req.user) {
    res.redirect('/user/panel')
  }
  res.render('login/signin', {
    pageTitle: 'Crear cuenta',
    bodyClass: 'body-signin',
    signin: true,
  });
};
//validamos formulario de crear cuenta
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
//crear la cuenta
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

exports.closeSession = (req,res) => {
  req.logout();
  res.redirect('/');
}