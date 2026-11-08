let usuarioModel = require("../models/usuarioModel");

// LOGIN
function autenticar(req, res) {
    let email = req.body.emailServer;
    let senha = req.body.senhaServer;

    if (email == null) {
        res.status(400).send("Seu email não chegou na API!");
    } else if (senha == null) {
        res.status(400).send("Sua senha não chegou na API!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(function (resultado) {
                if (resultado.length == 1) {
                    res.json({
                        idUsuario: resultado[0].idUsuario,
                        nome: resultado[0].nome,
                        email: resultado[0].email,
                        fkPersonagem: resultado[0].fkPersonagem
                    });
                } else if (resultado.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            })
            .catch(function (erro) {
                console.log("Erro ao fazer login: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

// CADASTRO
function cadastrar(req, res) {
    let nome = req.body.nomeServer;
    let email = req.body.emailServer;
    let senha = req.body.senhaServer;

    if (nome == null) {
        res.status(400).send("Seu nome não chegou na API!");
    } else if (email == null) {
        res.status(400).send("Seu email não chegou na API!");
    } else if (senha == null) {
        res.status(400).send("Sua senha não chegou na API!");
    } else {
        usuarioModel.cadastrar(nome, email, senha)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log("Erro ao cadastrar: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    autenticar,
    cadastrar
};