const express = require("express");
const router = express.Router();

const accountsController = require('../controllers/accountsController');

module.exports = () => {
    router.get('/iniciar-sesion', accountsController.loginHome);
    router.post('/iniciar-sesion', accountsController.loginUser);

    router.get('/crear-cuenta', accountsController.signinForm)
    router.post('/signin',
    accountsController.validateSignin,
    accountsController.signinPost);

    return router;
}