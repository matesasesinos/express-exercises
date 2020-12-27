const { body, validationResult } = require("express-validator");

//panel HOme
exports.panelHome = (req, res) => {
    res.render("panel/panel", {
      pageTitle: "Panel de Usuario",
      bodyClass: "body-panel-home",
      panel: true,
    });
  };