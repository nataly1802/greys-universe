let personagemModel = require("../models/personagemModel");

function listar(req, res) {
    personagemModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum personagem encontrado!");
            }
        })
        .catch(function (erro) {
            console.log("Erro ao listar personagens: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listar
};