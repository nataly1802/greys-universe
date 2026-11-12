let database = require("../database/config");

function registrar(idUsuario, idNivel, acertos, totalPerguntas) {
    let instrucaoSql = `
        INSERT INTO tentativa (fkUsuario, fkNivel, acertos, totalPerguntas)
        VALUES (${idUsuario}, ${idNivel}, ${acertos}, ${totalPerguntas});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    registrar
};