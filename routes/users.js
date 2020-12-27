const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

module.exports = () => {
    router.get('/panel', usersController.panelHome);

    return router;
}