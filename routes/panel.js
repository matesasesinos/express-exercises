const express = require("express");
const router = express.Router();

const panelController = require("../controllers/panelController");

module.exports = () => {
  router.get("/panel", panelController.panelHome);

  router.get("/configuracion", panelController.configurationEdit);
  router.post(
    "/configuracion",
    panelController.configurationValidation,
    panelController.configurationPost
  );

  return router;
};
