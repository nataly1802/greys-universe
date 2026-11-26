CREATE DATABASE GreysUniverse;

USE GreysUniverse;

CREATE TABLE personagem (
idPersonagem INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
descricao VARCHAR(200),
imagem VARCHAR(45)
);

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(45) UNIQUE,
senha VARCHAR(45),
fkPersonagem INT,
CONSTRAINT fkPersonagemUsuario FOREIGN KEY (fkPersonagem)
	REFERENCES personagem(idPersonagem)
);

CREATE TABLE nivel (
idNivel INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(10),
CONSTRAINT chkNomeNivel CHECK (nome IN ('facil', 'medio', 'dificil'))
);

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

INSERT INTO personagem (nome, descricao, imagem) VALUES
('Meredith Grey', 'A protagonista: residente que se torna uma das maiores cirurgiãs do hospital.', 'meredith.webp'),
('Cristina Yang', 'Cirurgiã cardiotorácica brilhante, competitiva e a melhor amiga de Meredith.', 'cristina.jpg'),
('Derek Shepherd', 'Neurocirurgião conhecido como McDreamy.', 'derek.jpg'),
('Miranda Bailey', 'Exigente e justa, a residente mais respeitada pelos internos.', 'bailey.jpg'),
('Alex Karev', 'Começa arrogante e se torna um dedicado cirurgião pediátrico.', 'alex.jpg'),
('Richard Webber', 'Chefe de cirurgia e mentor de várias gerações de médicos.', 'webber.jpg'),
('Mark Sloan', 'Cirurgião plástico conhecido como McSteamy, melhor amigo de Derek.', 'mark.jpg'),
('Callie Torres', 'Cirurgiã ortopédica, forte, divertida e leal aos amigos.', 'callie.jpg'),
('Lexie Grey', 'Meia-irmã de Meredith, famosa pela memória fotográfica.', 'lexie.jpg'),
('April Kepner', 'Cirurgiã de trauma, organizada e muito dedicada.', 'april.jpg');

SELECT usuario.nome AS Usuario,
	personagem.nome AS Personagem
	FROM usuario JOIN personagem
		ON fkPersonagem = idPersonagem;

SELECT nivel.nome AS Nivel,
	acertos,
	(acertos * 100 / totalPerguntas) AS porcentagem
	FROM tentativa JOIN nivel
		ON fkNivel = idNivel
	WHERE fkUsuario = 1;

SELECT nivel.nome AS Nivel,
	MAX(acertos) AS melhorResultado,
	ROUND(AVG(acertos), 1) AS mediaAcertos,
	COUNT(idTentativa) AS totalTentativas
	FROM tentativa JOIN nivel
		ON fkNivel = idNivel
	WHERE fkUsuario = 1
	GROUP BY nivel.nome;

SELECT fkNivel,
       ROUND(acertos * 100 / totalPerguntas) AS porcentagem,
       dtTentativa
    FROM tentativa
    WHERE fkUsuario = 1
    ORDER BY idTentativa;

SELECT nivel.nome AS nivel,
       ROUND(AVG(acertos * 100 / totalPerguntas)) AS mediaPorcentagem
    FROM tentativa JOIN nivel
        ON fkNivel = idNivel
    WHERE fkUsuario = 1
    GROUP BY idNivel, nivel.nome
    ORDER BY idNivel;

SELECT ROUND(MAX(acertos * 100 / totalPerguntas)) AS melhorPorcentagem,
       ROUND(AVG(acertos * 100 / totalPerguntas)) AS mediaPorcentagem,
       COUNT(idTentativa) AS totalTentativas
    FROM tentativa
    WHERE fkUsuario = 1;

SELECT MAX(fkNivel) AS maiorNivelConcluido
    FROM tentativa
    WHERE fkUsuario = 1
      AND acertos * 100 / totalPerguntas >= 70;