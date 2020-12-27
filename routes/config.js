const express = require('express');
const router = express.Router();

const configurationController = require('../controllers/configurationController');


module.exports = () => {
  router.get('/configuracion', configurationController.configurationEdit);
  router.post(
    '/configuracion',
    configurationController.configurationValidation,
    configurationController.configurationPost
  );

  return router;
};
