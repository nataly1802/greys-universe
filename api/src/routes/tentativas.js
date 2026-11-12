let express = require("express");
let router = express.Router();

let tentativaController = require("../controllers/tentativaController");

// QUIZ: salvar tentativa (POST = envia dados)
router.post("/registrar", function (req, res) {
    tentativaController.registrar(req, res);
});

// DASHBOARD (GET = só busca dados)
router.get("/evolucao/:idUsuario", function (req, res) {
    tentativaController.buscarEvolucao(req, res);
});

router.get("/media-nivel/:idUsuario", function (req, res) {
    tentativaController.buscarMediaPorNivel(req, res);
});

router.get("/kpis/:idUsuario", function (req, res) {
    tentativaController.buscarKpis(req, res);
});

router.get("/nivel-concluido/:idUsuario", function (req, res) {
    tentativaController.buscarNivelConcluido(req, res);
});

module.exports = router;