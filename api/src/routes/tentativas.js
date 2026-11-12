let express = require("express");
let router = express.Router();

let tentativaController = require("../controllers/tentativaController");

router.post("/registrar", function (req, res) {
    tentativaController.registrar(req, res);
});

module.exports = router;