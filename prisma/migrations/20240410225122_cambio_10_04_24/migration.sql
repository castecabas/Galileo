/*
  Warnings:

  - You are about to drop the column `genero` on the `libros` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `libros` DROP COLUMN `genero`,
    ADD COLUMN `categoria` VARCHAR(40) NULL,
    ADD COLUMN `idAutor` INTEGER NULL,
    ADD COLUMN `idGenero` INTEGER NULL;

-- CreateTable
CREATE TABLE `generos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(20) NULL,
    `descripcion` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `autores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(30) NULL,
    `apellido` VARCHAR(30) NULL,
    `nacionalidad` VARCHAR(60) NULL,
    `fecha_nacimiento` VARCHAR(10) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prestamos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha_inicial` VARCHAR(10) NULL,
    `fecha_entrega` VARCHAR(10) NULL,
    `idLibro` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL,
    `direccion` VARCHAR(80) NOT NULL,
    `telefono` VARCHAR(12) NOT NULL,
    `fecha_registro` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idPrestamo` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `libros` ADD CONSTRAINT `libros_idGenero_fkey` FOREIGN KEY (`idGenero`) REFERENCES `generos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `libros` ADD CONSTRAINT `libros_idAutor_fkey` FOREIGN KEY (`idAutor`) REFERENCES `autores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prestamos` ADD CONSTRAINT `prestamos_idLibro_fkey` FOREIGN KEY (`idLibro`) REFERENCES `libros`(`isbn`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clientes` ADD CONSTRAINT `clientes_idPrestamo_fkey` FOREIGN KEY (`idPrestamo`) REFERENCES `prestamos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
