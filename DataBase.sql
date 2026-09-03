CREATE DATABASE SENATI;

USE SENATI;

-- Investigar:
-- Migraciones:
CREATE TABLE alumnos(
	id 			INT AUTO_INCREMENT PRIMARY KEY,
    apellidos 	VARCHAR(40)  	NOT NULL,
    nombres		VARCHAR(40)		NOT NULL,
    telefono 	CHAR(9)			NOT NULL,
    direccion 	VARCHAR(90)		NULL,
	email		VARCHAR(90)		NULL,
	create_at 	DATETIME		NOT NULL DEFAULT NOW(),
    update_at	DATETIME		NULL

)ENGINE = INNODB;

-- semillas
INSERT INTO alumnos(apellidos, nombres, telefono, direccion, email)
	VALUES
    ('Francia Minaya','Jhon Edwar','965621325','Grocio Prado','jhon@gmail.com'),
	('Mendoza Gonzales','Katherin','965621348','Sunampe','katherin@gmail.com');
    
SELECT * FROM alumnos;