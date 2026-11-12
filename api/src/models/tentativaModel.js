let database = require("../database/config");

// ===== QUIZ: salvar uma tentativa =====
function registrar(idUsuario, idNivel, acertos, totalPerguntas) {
    let instrucaoSql = `
        INSERT INTO tentativa (fkUsuario, fkNivel, acertos, totalPerguntas)
        VALUES (${idUsuario}, ${idNivel}, ${acertos}, ${totalPerguntas});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// ===== DASHBOARD: gráfico de linha (evolução por tentativa) =====
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

// ===== DASHBOARD: gráfico de barras (média por nível) =====
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

// ===== DASHBOARD: KPIs (melhor, média e total) =====
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

// ===== DASHBOARD: KPI nível atual =====
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