let express = require("express");
let router = express.Router();

let personagemController = require("../controllers/personagemController");

// endereço: /personagens/listar
router.get("/listar", function (req, res) {
    personagemController.listar(req, res);
});

module.exports = router;