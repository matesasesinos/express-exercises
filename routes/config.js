const express = require('express');
const router = express.Router();

const accountsController = require('../controllers/accountsController');
const configurationController = require('../controllers/configurationController');


module.exports = () => {
  router.use(accountsController.verifyAuth);
  router.get('/configuracion', configurationController.configurationEdit);
  router.post(
    '/configuracion',
    configurationController.configurationValidation,
    configurationController.configurationPost
  );

  return router;
};
