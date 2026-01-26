const express = require("express");
const router = express.Router();
const parcelaController = require("../controllers/parcelaController");

console.log("parcelaController:", parcelaController);

router.get("/", parcelaController.getAll);

module.exports = router;
