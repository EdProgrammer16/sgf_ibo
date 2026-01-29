const express = require("express");
const router = express.Router();
const parcelaController = require("../controllers/parcelaController");

router.get("/", parcelaController.getAll);
router.get("/:id", parcelaController.getById);

module.exports = router;
