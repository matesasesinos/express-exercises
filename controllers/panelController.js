const mongoose = require("mongoose");
const Configuration = mongoose.model("Configuration");
const { body, validationResult } = require("express-validator");

exports.panelHome = (req, res) => {
  res.render("panel/panel", {
    pageTitle: "Panel de Usuario",
    bodyClass: "body-panel-home",
    panel: true,
  });
};
//conf
exports.configurationEdit = async (req, res) => {
  const configuration = await Configuration.findOne({
    siteID: 1,
  });
  res.render("panel/configuration", {
    pageTitle: "Configuración del Sitio",
    bodyClass: "body-configuration",
    config: true,
    configuration,
  });
};

exports.configurationValidation = [
  body("title")
    .escape()
    .not()
    .isEmpty()
    .withMessage("El Titulo del Sitio no puede estar vació."),
  body("email")
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("El Email no puede estar vació."),
  body("email").isEmail().withMessage("Ingrese un Email valido."),
  body("phone")
    .escape()
    .not()
    .isEmpty()
    .withMessage("El Teléfono no puede estar vació."),
  body("phone_2").escape(),
  body("address_1").escape(),
  body("address_2").escape(),
  body("city").escape(),
  body("country").escape(),
  body("description").escape().trim(),
  body("copy").escape().trim(),
  async (req, res, next) => {
    const configuration = await Configuration.findOne({
      siteID: 1,
    });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("danger", errors.array());
      res.render("panel/configuration", {
        pageTitle: "Configuración del Sitio",
        bodyClass: "body-configuration",
        config: true,
        configuration,
        messages: req.flash(),
      });
      return;
    }
    return next();
  },
];

exports.configurationPost = async (req, res, next) => {
  const {
    title,
    email,
    phone,
    phone_2,
    address_1,
    address_2,
    city,
    country,
    description,
    copy,
  } = req.body;

  const data = {
    title,
    email,
    phone,
    phone_2,
    address_1,
    address_2,
    city,
    country,
    description,
    copy,
  };

  const updateConfig = await Configuration.findOneAndUpdate(
    { siteID: 1 },
    data,
    { new: true }
  );
  if (!updateConfig) {
      console.log('no paso no');
        req.flash("error", "Hubo en error al editar");
        res.redirect("/configuracion");
  }
  req.flash("success", "Se edito correctamente la configuración.");
  res.redirect("/configuracion");
};
