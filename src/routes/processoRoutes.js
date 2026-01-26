const express = require("express");
const router = express.Router();
const processoController = require("../controllers/processoController");

console.log("processoController:", processoController);

router.get("/", processoController.getAll);
router.get("/:n_processo", processoController.getByNprocesso)
router.put('/:id', processoController.update)
router.post("/", processoController.create)
router.delete("/:id", processoController.delete);


module.exports = router;
