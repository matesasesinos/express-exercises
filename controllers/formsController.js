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