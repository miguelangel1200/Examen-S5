-- CreateTable
CREATE TABLE `personaje` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imagen` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NULL,
    `edad` INTEGER NOT NULL,
    `historia` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pelicula` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imagen` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `calificacion` INTEGER NOT NULL,
    `peliculaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `Imagen` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PeliculaToPersonaje` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PeliculaToPersonaje_AB_unique`(`A`, `B`),
    INDEX `_PeliculaToPersonaje_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pelicula` ADD CONSTRAINT `pelicula_peliculaId_fkey` FOREIGN KEY (`peliculaId`) REFERENCES `genero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PeliculaToPersonaje` ADD CONSTRAINT `_PeliculaToPersonaje_A_fkey` FOREIGN KEY (`A`) REFERENCES `pelicula`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PeliculaToPersonaje` ADD CONSTRAINT `_PeliculaToPersonaje_B_fkey` FOREIGN KEY (`B`) REFERENCES `personaje`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
