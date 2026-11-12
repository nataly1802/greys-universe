let tentativaModel = require("../models/tentativaModel");

function registrar(req, res) {
    let idUsuario = req.body.idUsuarioServer;
    let idNivel = req.body.idNivelServer;
    let acertos = req.body.acertosServer;
    let totalPerguntas = req.body.totalPerguntasServer;

    if (idUsuario == null) {
        res.status(400).send("O id do usuário está vazio!");
    } else if (idNivel == null) {
        res.status(400).send("O nível está vazio!");
    } else if (acertos == null) {
        res.status(400).send("Os acertos estão vazios!");
    } else if (totalPerguntas == null) {
        res.status(400).send("O total de perguntas está vazio!");
    } else {
        tentativaModel.registrar(idUsuario, idNivel, acertos, totalPerguntas)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao registrar a tentativa: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    registrar
};