let database = require("../database/config");

function autenticar(email, senha) {
    let instrucaoSql = `
        SELECT idUsuario, nome, email, fkPersonagem
            FROM usuario
            WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha) {
    let instrucaoSql = `
        INSERT INTO usuario (nome, email, senha)
            VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarPersonagem(idUsuario, idPersonagem) {
    let instrucaoSql = `
        UPDATE usuario SET fkPersonagem = ${idPersonagem}
            WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    atualizarPersonagem
};