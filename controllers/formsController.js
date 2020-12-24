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
