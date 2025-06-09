CREATE DATABASE creaciones_mov;

CREATE TABLE clientes (
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(50) NOT NULL UNIQUE,
	pass_word VARCHAR(72),
	telefono VARCHAR(16),
	nombres VARCHAR(100),
	apellido_paterno VARCHAR(25),
	apellido_materno VARCHAR(25),
	rut VARCHAR(12),
	fecha_nacimiento DATE);

CREATE TABLE clientes_claves (
	id BIGINT PRIMARY KEY,
	clave VARCHAR(250),
	FOREIGN KEY (id) REFERENCES clientes(id));

CREATE TABLE direcciones (
	id BIGSERIAL PRIMARY KEY,
	pais VARCHAR(50),
	region_estado VARCHAR(50),
	ciudad VARCHAR(50),
	comuna VARCHAR(50),
	calle VARCHAR(50),
	numero VARCHAR(10),
	depto_numero VARCHAR(10),
	codigo_postal VARCHAR(20));

CREATE TABLE clientes_direcciones (
	id BIGSERIAL PRIMARY KEY,
	id_cliente BIGINT,
	FOREIGN KEY (id_cliente) REFERENCES clientes(id),
	id_direccion BIGINT,
	FOREIGN KEY (id_direccion) REFERENCES direcciones(id)
	);

CREATE TABLE productos (
	id VARCHAR(25) PRIMARY KEY,
	nombre VARCHAR(120),
	descripcion1 VARCHAR(200),
	descripcion2 VARCHAR(200),
	stock INTEGER,
	stockminimo INTEGER,
	stockmaximo INTEGER,
	precio INTEGER
	);

CREATE TABLE compras (
	id BIGSERIAL PRIMARY KEY,
	id_cliente BIGINT,
	FOREIGN KEY (id_cliente)REFERENCES clientes(id),
	id_direccion BIGINT,
	FOREIGN KEY (id_direccion) REFERENCES direcciones(id),
	num_factura INTEGER,
	num_boleta INTEGER,
	total_pagado INTEGER,
	id_producto1 VARCHAR(25),
	cant_producto1 INTEGER,
	precio_producto1 INTEGER,
	id_producto2 VARCHAR(25),
	cant_producto2 INTEGER,
	precio_producto2 INTEGER,
	id_producto3 VARCHAR(25),
	cant_producto3 INTEGER,
	precio_producto3 INTEGER,
	id_producto4 VARCHAR(25),
	cant_producto4 INTEGER,
	precio_producto4 INTEGER,
	id_producto5 VARCHAR(25),
	cant_producto5 INTEGER,
	precio_producto5 INTEGER,
	id_producto6 VARCHAR(25),
	cant_producto6 INTEGER,
	precio_producto6 INTEGER,
	id_producto7 VARCHAR(25),
	cant_producto7 INTEGER,
	precio_producto7 INTEGER,
	id_producto8 VARCHAR(25),
	cant_producto8 INTEGER,
	precio_producto8 INTEGER
	);

CREATE TABLE carros_clientes (
	id BIGINT PRIMARY KEY,
	FOREIGN KEY (id) REFERENCES clientes,
	id_producto1 VARCHAR(25),
	cant_producto1 INTEGER,
	precio_producto1 INTEGER,
	id_producto2 VARCHAR(25),
	cant_producto2 INTEGER,
	precio_producto2 INTEGER,
	id_producto3 VARCHAR(25),
	cant_producto3 INTEGER,
	precio_producto3 INTEGER,
	id_producto4 VARCHAR(25),
	cant_producto4 INTEGER,
	precio_producto4 INTEGER,
	id_producto5 VARCHAR(25),
	cant_producto5 INTEGER,
	precio_producto5 INTEGER,
	id_producto6 VARCHAR(25),
	cant_producto6 INTEGER,
	precio_producto6 INTEGER,
	id_producto7 VARCHAR(25),
	cant_producto7 INTEGER,
	precio_producto7 INTEGER,
	id_producto8 VARCHAR(25),
	cant_producto8 INTEGER,
	precio_producto8 INTEGER
	);

CREATE TABLE comentarios (
	id BIGSERIAL PRIMARY KEY,
	id_cliente BIGINT,
	FOREIGN KEY (id_cliente) REFERENCES clientes(id),
	id_product VARCHAR(25),
	FOREIGN KEY (id_product) REFERENCES productos(id),
	comentario VARCHAR(200)
	);

SELECT * FROM clientes;