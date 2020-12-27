const express = require("express");
const router = express.Router();
const unController = require('../controllers/unController');

module.exports = () => {
    router.get('/un', unController.algo);

    return router;
}