<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260416000001 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Rename skill.дlevel to skill.level (fix Cyrillic typo in column name)';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE skill CHANGE `дlevel` `level` VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE skill CHANGE `level` `дlevel` VARCHAR(255) DEFAULT NULL');
    }
}
