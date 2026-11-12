let express = require("express");
let router = express.Router();

let usuarioController = require("../controllers/usuarioController");

// endereço: /usuarios/cadastrar
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

// endereço: /usuarios/autenticar
router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

// endereço: /usuarios/atualizarPersonagem
router.post("/atualizarPersonagem", function (req, res) {
    usuarioController.atualizarPersonagem(req, res);
});

module.exports = router;