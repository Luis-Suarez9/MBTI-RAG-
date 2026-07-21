-- CreateTable
CREATE TABLE `individual_mbti` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `ai_description` TEXT NULL,
    `core_explain` TEXT NULL,
    `EI%` DOUBLE NOT NULL,
    `SN%` DOUBLE NOT NULL,
    `TF%` DOUBLE NOT NULL,
    `JP%` DOUBLE NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `individual_mbti` ADD CONSTRAINT `individual_mbti_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
