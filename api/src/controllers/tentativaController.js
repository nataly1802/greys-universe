let tentativaModel = require("../models/tentativaModel");

// ===== QUIZ: salvar uma tentativa =====
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

// ===== DASHBOARD: gráfico de linha =====
function buscarEvolucao(req, res) {
    let idUsuario = req.params.idUsuario;

    tentativaModel.buscarEvolucao(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma tentativa encontrada!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar a evolução: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// ===== DASHBOARD: gráfico de barras =====
function buscarMediaPorNivel(req, res) {
    let idUsuario = req.params.idUsuario;

    tentativaModel.buscarMediaPorNivel(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma tentativa encontrada!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar a média por nível: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// ===== DASHBOARD: KPIs =====
function buscarKpis(req, res) {
    let idUsuario = req.params.idUsuario;

    tentativaModel.buscarKpis(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os KPIs: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// ===== DASHBOARD: KPI nível atual =====
function buscarNivelConcluido(req, res) {
    let idUsuario = req.params.idUsuario;

    tentativaModel.buscarNivelConcluido(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar o nível: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    registrar,
    buscarEvolucao,
    buscarMediaPorNivel,
    buscarKpis,
    buscarNivelConcluido
};