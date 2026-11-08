let database = require("../database/config");

// LOGIN: procura um usuário com esse e-mail e essa senha
function autenticar(email, senha) {
    let instrucaoSql = `
        SELECT idUsuario, nome, email, fkPersonagem
            FROM usuario
            WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// CADASTRO: insere um novo usuário (sem personagem ainda)
function cadastrar(nome, email, senha) {
    let instrucaoSql = `
        INSERT INTO usuario (nome, email, senha)
            VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};