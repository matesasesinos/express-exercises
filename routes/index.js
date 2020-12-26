const express = require("express");
const router = express.Router();

//controllers
const homeController = require("../controllers/homeController");


module.exports = () => {
  router.get("/", homeController.homeController);
  return router;
};
