let mysql = require("mysql2");

// dados de conexão: vêm do arquivo .env.dev
let mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

// função que roda qualquer comando SQL no banco
function executar(instrucao) {

    if (process.env.AMBIENTE_PROCESSO != "producao" && process.env.AMBIENTE_PROCESSO != "desenvolvimento") {
        console.log("\nO AMBIENTE NÃO FOI DEFINIDO NO .env.dev\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO");
    }

    return new Promise(function (resolve, reject) {
        let conexao = mysql.createConnection(mySqlConfig);
        conexao.connect();
        conexao.query(instrucao, function (erro, resultados) {
            conexao.end();
            if (erro) {
                reject(erro);
            }
            console.log(resultados);
            resolve(resultados);
        });
    });
}

module.exports = {
    executar
};