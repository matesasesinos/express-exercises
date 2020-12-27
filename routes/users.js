const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const accountsController = require('../controllers/accountsController');

module.exports = () => {
  router.use(accountsController.verifyAuth);
  router.get('/panel', usersController.panelHome);
  router.get('/mensajes', usersController.messagesHome);
  router.get('/cerrar-sesion',accountsController.closeSession);

  return router;
};
