const express = require("express");
const router = express.Router();

const loginController = require('../controllers/loginController');

module.exports = () => {
    router.get('/iniciar-sesion', loginController.loginHome);

    router.get('/crear-cuenta', loginController.signinForm)

    return router;
}
