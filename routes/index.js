const express = require('express');
const router = express.Router();

//controllers
const homeController = require('../controllers/homeController');
const formsController = require('../controllers/formsController');

module.exports = () => {
    router.get('/', homeController.homeController);

    //formularios get
    router.get('/formularios', formsController.formOne);
    //formulario uno post
    router.post('/formulario-uno', formsController.formOneEnviar);

    return router;
}