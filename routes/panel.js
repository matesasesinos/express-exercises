const express = require("express");
const router = express.Router();

const panelController = require('../controllers/panelController');

module.exports = () => {

    router.get('/panel', panelController.panelHome);

    return router;
}