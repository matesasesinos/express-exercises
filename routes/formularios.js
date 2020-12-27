const express = require("express");
const router = express.Router();

const formsController = require("../controllers/formsController");

module.exports = () => {
    //formularios get
  router.get("/", formsController.formOne);
  //formulario uno post
  router.post("/formulario-uno", formsController.formOneEnviar);

  //formulario flahs get
  router.get("/flash", formsController.formFlashGet);
  //formulario flash post
  router.post("/formularios-flash", formsController.formFlashPost);

  //formulario validator
  router.get("/validator", formsController.formValidator);
  router.post(
    "/validator",
    formsController.validacion,
    formsController.validatorEnviar
  );

  return router;
}