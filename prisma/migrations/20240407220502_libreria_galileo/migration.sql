-- CreateTable
CREATE TABLE `libros` (
    `isbn` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(60) NULL,
    `genero` VARCHAR(40) NULL,
    `publicacion` SMALLINT NULL,
    `paginas` SMALLINT NULL,
    `idioma` VARCHAR(20) NULL,
    `editorial` VARCHAR(30) NULL,

    PRIMARY KEY (`isbn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
