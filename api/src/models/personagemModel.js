let database = require("../database/config");

// busca todos os personagens do banco
function listar() {
    let instrucaoSql = `
        SELECT idPersonagem, nome, descricao, imagem
            FROM personagem;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar
};