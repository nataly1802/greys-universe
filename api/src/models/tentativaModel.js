let database = require("../database/config");

function registrar(idUsuario, idNivel, acertos, totalPerguntas) {
    let instrucaoSql = `
        INSERT INTO tentativa (fkUsuario, fkNivel, acertos, totalPerguntas)
        VALUES (${idUsuario}, ${idNivel}, ${acertos}, ${totalPerguntas});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarEvolucao(idUsuario) {
    let instrucaoSql = `
        SELECT fkNivel,
               ROUND(acertos * 100 / totalPerguntas) AS porcentagem,
               dtTentativa
            FROM tentativa
            WHERE fkUsuario = ${idUsuario}
            ORDER BY idTentativa;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMediaPorNivel(idUsuario) {
    let instrucaoSql = `
        SELECT nivel.nome AS nivel,
               ROUND(AVG(acertos * 100 / totalPerguntas)) AS mediaPorcentagem
            FROM tentativa JOIN nivel
                ON fkNivel = idNivel
            WHERE fkUsuario = ${idUsuario}
            GROUP BY idNivel, nivel.nome
            ORDER BY idNivel;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKpis(idUsuario) {
    let instrucaoSql = `
        SELECT ROUND(MAX(acertos * 100 / totalPerguntas)) AS melhorPorcentagem,
               ROUND(AVG(acertos * 100 / totalPerguntas)) AS mediaPorcentagem,
               COUNT(idTentativa) AS totalTentativas
            FROM tentativa
            WHERE fkUsuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarNivelConcluido(idUsuario) {
    let instrucaoSql = `
        SELECT MAX(fkNivel) AS maiorNivelConcluido
            FROM tentativa
            WHERE fkUsuario = ${idUsuario}
              AND acertos * 100 / totalPerguntas >= 70;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    registrar,
    buscarEvolucao,
    buscarMediaPorNivel,
    buscarKpis,
    buscarNivelConcluido
};