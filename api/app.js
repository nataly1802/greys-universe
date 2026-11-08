// escolhe qual arquivo de configuração ler
let ambiente_processo = "desenvolvimento";
let caminho_env = ambiente_processo == "producao" ? ".env" : ".env.dev";

require("dotenv").config({ path: caminho_env });

let express = require("express");
let cors = require("cors");
let path = require("path");

let PORTA_APP = process.env.APP_PORT;
let HOST_APP = process.env.APP_HOST;

let app = express();

// ROTAS DA API (vamos adicionar aqui: usuarios, personagens, tentativas)

let usuarioRouter = require("./src/routes/usuarios");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../front")));
app.use(cors());

// REGISTRO DAS ROTAS (vamos adicionar aqui)

app.use("/usuarios", usuarioRouter);

app.listen(PORTA_APP, function () {
    console.log(`Grey's Universe rodando em http://${HOST_APP}:${PORTA_APP}`);
});