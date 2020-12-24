const express = require("express");
const router = express.Router();

//controllers
const homeController = require("../controllers/homeController");
const formsController = require("../controllers/formsController");

module.exports = () => {
  router.get("/", homeController.homeController);

  //formularios get
  router.get("/formularios", formsController.formOne);
  //formulario uno post
  router.post("/formulario-uno", formsController.formOneEnviar);

  //formulario flahs get
  router.get("/formularios-flash", formsController.formFlashGet);
  //formulario flash post
  router.post("/formularios-flash", formsController.formFlashPost);

  //formulario validator
  router.get("/formularios-validator", formsController.formValidator);
  router.post(
    "/formularios-validator",
    formsController.validacion,
    formsController.validatorEnviar
  );

  return router;
};
