-- =========================================================
-- PROJETO INDIVIDUAL – Grey’s Universe
-- Script de criação do banco de dados (rodar na VM Linux)
-- =========================================================

CREATE DATABASE GreysUniverse;

USE GreysUniverse;

-- ---------------------------------------------------------
-- TABELA PERSONAGEM
-- Guarda os personagens que o usuário pode escolher no perfil
-- (no lugar da tabela "empresa" do web-data-viz)
-- ---------------------------------------------------------
CREATE TABLE personagem (
idPersonagem INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
descricao VARCHAR(200)
);

-- ---------------------------------------------------------
-- TABELA USUARIO
-- 1 personagem pode ser escolhido por N usuários (1:N)
-- fkPersonagem começa vazio (NULL) no cadastro e é preenchido
-- quando o usuário escolhe o personagem (UPDATE)
-- ---------------------------------------------------------
CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(45),
senha VARCHAR(45),
fkPersonagem INT,
CONSTRAINT fkPersonagemUsuario FOREIGN KEY (fkPersonagem)
	REFERENCES personagem(idPersonagem)
);

-- ---------------------------------------------------------
-- TABELA NIVEL
-- Os 3 níveis do quiz
-- ---------------------------------------------------------
CREATE TABLE nivel (
idNivel INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(10),
CONSTRAINT chkNomeNivel CHECK (nome IN ('facil', 'medio', 'dificil'))
);

-- ---------------------------------------------------------
-- TABELA TENTATIVA (ASSOCIATIVA) – RELACIONAMENTO N:N
-- 1 usuário joga N níveis e 1 nível é jogado por N usuários.
-- Igual à tabela "matricula" (aluno N:N curso) da aula 01:
-- chave composta + dados próprios (acertos, como a nota na matrícula)
-- ---------------------------------------------------------
CREATE TABLE tentativa (
idTentativa INT AUTO_INCREMENT,
fkUsuario INT,
CONSTRAINT fkUsuarioTentativa FOREIGN KEY (fkUsuario)
	REFERENCES usuario(idUsuario),
fkNivel INT,
CONSTRAINT fkNivelTentativa FOREIGN KEY (fkNivel)
	REFERENCES nivel(idNivel),
CONSTRAINT pkComposta PRIMARY KEY (idTentativa, fkUsuario, fkNivel),
acertos INT,
totalPerguntas INT,
dtTentativa DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO nivel (nome) VALUES
('facil'),
('medio'),
('dificil');

-- ---------------------------------------------------------
-- PERSONAGENS (troque ou acrescente os que você quiser)
-- ---------------------------------------------------------
INSERT INTO personagem (nome, descricao) VALUES
('Meredith Grey', 'A protagonista: residente que se torna uma das maiores cirurgiãs do hospital.'),
('Cristina Yang', 'Cirurgiã cardiotorácica brilhante, competitiva e a melhor amiga de Meredith.'),
('Derek Shepherd', 'Neurocirurgião conhecido como McDreamy.'),
('Miranda Bailey', 'Exigente e justa, conhecida como "A Nazista" pelos residentes.'),
('Alex Karev', 'Começa arrogante e se torna um dedicado cirurgião pediátrico.'),
('Richard Webber', 'Chefe de cirurgia e mentor de várias gerações de médicos.');

-- =========================================================
-- TESTES (rode depois de criar tudo, para conferir)
-- =========================================================

-- usuário de teste
INSERT INTO usuario (nome, email, senha) VALUES
('Teste', 'teste@email.com', '123456');

-- usuário escolhe o personagem (o que a tela de personagem vai fazer)
UPDATE usuario SET fkPersonagem = 2 WHERE idUsuario = 1;

-- tentativas de teste
-- fkNivel: 1 = facil, 2 = medio, 3 = dificil
INSERT INTO tentativa (fkUsuario, fkNivel, acertos, totalPerguntas) VALUES
(1, 1, 6, 10),
(1, 1, 8, 10),
(1, 2, 7, 10);

-- usuário com o nome do personagem escolhido (JOIN)
SELECT usuario.nome AS Usuario,
	personagem.nome AS Personagem
	FROM usuario JOIN personagem
		ON fkPersonagem = idPersonagem;

-- porcentagem de cada tentativa (regra de três: acertos * 100 / total)
SELECT nivel.nome AS Nivel,
	acertos,
	(acertos * 100 / totalPerguntas) AS porcentagem
	FROM tentativa JOIN nivel
		ON fkNivel = idNivel
	WHERE fkUsuario = 1;

-- DASHBOARD: melhor resultado, média e total de tentativas por nível
SELECT nivel.nome AS Nivel,
	MAX(acertos) AS melhorResultado,
	ROUND(AVG(acertos), 1) AS mediaAcertos,
	COUNT(idTentativa) AS totalTentativas
	FROM tentativa JOIN nivel
		ON fkNivel = idNivel
	WHERE fkUsuario = 1
	GROUP BY nivel.nome;