const { body, validationResult } = require("express-validator"); //se requiere para el validador

/* formulario simple */
exports.formOne = (req, res) => {
  res.render("forms", {
    pageTitle: "Formularios en Express",
  });
};
exports.formOneEnviar = (req, res) => {
  const { text, email, number, date, textarea, file, checkbox} = req.body;
  res.status(200).json({
    values: {
      text,
      email,
      number,
      date,
      file,
      checkbox,
      textarea,
      notes: 'El checkbox llega como un array porque así lo estamos mandando, el file llega el nombre pero no sube nada este código.'
    },
  });
};
/* flash */
exports.formFlashGet = (req,res) => {
  res.render('flash', {
    pageTitle: 'Mensajes flash'
  })
}
exports.formFlashPost = (req,res) => {
  const { text, email } = req.body;
  if(!text) {
    req.flash('danger','El campo de TEXTO no tiene nada');
    res.render('flash', {
      pageTitle: 'Mensajes flash',
      notes: 'Esta no es una validación',
      messages: req.flash()
    })
    return;
  }
  if(!email)  {
    req.flash('danger', 'El campo de EMAIL no tiene nada');
    res.render('flash', {
      pageTitle: 'Mensajes flash',
      notes: 'Esta no es una validación',
      messages: req.flash()
    })
    return;
  }
  req.flash('success','Una alerta de OK');
  res.render('flash', {
    pageTitle: 'Mensajes flash',
    notes: 'Esta no es una validación',
    messages: req.flash()
  })
}
/* validator */
exports.formValidator = (req,res) => {
  res.render("validator", {
    pageTitle: "Express Validator",
  });
}

exports.validacion = [
  //primero sanitizamos (docs: https://express-validator.github.io/docs/sanitization.html y lista de sanitizers: https://github.com/validatorjs/validator.js#sanitizers)
  body('name').trim().escape(),
  body('email').normalizeEmail(),
  body('number').toInt(),
  body('date').toDate(),
  body('textarea').trim().escape(), //esto hace que el textarea solo acepte texto plano
  //ahora validamos (lista de validadores: https://github.com/validatorjs/validator.js#validators)
  body('name').not().isEmpty().withMessage('El campo TEXTO no puede estar vacio'),
  body('email').not().isEmpty().withMessage('El campo EMAIL no puede estar vació'),
  body('email').isEmail().withMessage('Ingrese un EMAIL valido'),
  body('number').not().isEmpty().withMessage('El campo NUMERO no puede estar vació'),
  body('date').not().isEmpty().withMessage('El campo FECHA no puede estar vació'),
  body('file').not().isEmpty().withMessage('El campo UPLOAD no puede estar vació'),
  body('checkbox').not().isEmpty().withMessage('Seleccione al menos UNA opción'),
  body('textarea').not().isEmpty().withMessage('El MENSAJE es necesario'),
 (req,res,next) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("danger", errors.array());
      res.render("validator", {
        pageTitle: "Express Validator",
        messages: req.flash(),
      });
      return;
    }
    next();
}
];

exports.validatorEnviar = (req,res) => {
  const { text, email, number, date, textarea, file, checkbox} = req.body;
  res.status(200).json({
    values: {
      text,
      email,
      number,
      date,
      file,
      checkbox,
      textarea,
      notes: 'El checkbox llega como un array porque así lo estamos mandando, el file llega el nombre pero no sube nada este código. Si agregamos HTML a campos como textarea, se escapan.'
    },
  });
}