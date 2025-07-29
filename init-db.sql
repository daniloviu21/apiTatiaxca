CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE Categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE Menu (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion TEXT,
    precio DECIMAL(5,2),
    imagen_url TEXT,
    imagen_public_id TEXT,
    id_categoria INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id)
);

CREATE TABLE Ingredientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    unidad VARCHAR(50),
    stock INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE Insumos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    unidad VARCHAR(50),
    stock INT,
    es_desechable BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE menu_ingredientes (
    id SERIAL PRIMARY KEY,
    id_menu INT,
    id_ingrediente INT,
    cantidad INT,
    FOREIGN KEY (id_menu) REFERENCES Menu(id),
    FOREIGN KEY (id_ingrediente) REFERENCES Ingredientes(id)
);

CREATE TABLE menu_insumos (
    id SERIAL PRIMARY KEY,
    id_menu INT,
    id_insumo INT,
    cantidad INT,
    FOREIGN KEY (id_menu) REFERENCES Menu(id),
    FOREIGN KEY (id_insumo) REFERENCES Insumos(id)
);

CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    rol VARCHAR(50),
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    correo VARCHAR(255) UNIQUE,
    password TEXT NOT NULL,
    id_rol INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (id_rol) REFERENCES Roles(id)
);

CREATE TABLE Empleados (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    apPaterno VARCHAR(100),
    apMaterno VARCHAR(100),
    telefono VARCHAR(10),
    id_usuario INT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
);

CREATE TABLE Mesas (
    id SERIAL PRIMARY KEY,
    numero VARCHAR(2),
    ubicacion VARCHAR(50),
    estado VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE estatus (
    id SERIAL PRIMARY KEY,
    estado VARCHAR(50),
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE Ordenes (
    id SERIAL PRIMARY KEY,
    fecha DATE,
    total DECIMAL(10,2),
    propina DECIMAL(10,2),
    descuento DECIMAL(6,2),
    tipo_cliente VARCHAR(30),
    para_llevar BOOLEAN DEFAULT false,
    id_estatus INT,
    id_mesa INT,
    id_mesero INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (id_estatus) REFERENCES estatus(id),
    FOREIGN KEY (id_mesa) REFERENCES Mesas(id),
    FOREIGN KEY (id_mesero) REFERENCES Empleados(id)
);

CREATE TABLE detalle_ordenes (
    id SERIAL PRIMARY KEY,
    id_menu INT,
    id_orden INT,
    cantidad INT,
    subtotal DECIMAL(7,2),
    comentario TEXT,
    estado_preparacion VARCHAR(20) DEFAULT 'Pendiente',
    sin_ingredientes TEXT[],
    FOREIGN KEY (id_menu) REFERENCES Menu(id),
    FOREIGN KEY (id_orden) REFERENCES Ordenes(id)
);

CREATE TABLE Ventas (
    id SERIAL PRIMARY KEY,
    id_orden INT UNIQUE,
    metodo_pago VARCHAR(50),
    fecha_pago DATE,
    total_pagado DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (id_orden) REFERENCES Ordenes(id)
);