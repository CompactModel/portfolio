<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260522000001 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Fix corrupted column name in profile table (rename garbled bytes to name)';
    }

    public function up(Schema $schema): void
    {
        // The original migration created the column with corrupted bytes instead of 'name'
        // Exact bytes: \xd1\x82\xd1\x84\xd1\xd1\x82\xd1 followed by literal 'name'
        $corruptedCol = "\xd1\x82\xd1\x84\xd1\xd1\x82\xd1name";
        $this->addSql("ALTER TABLE profile CHANGE `{$corruptedCol}` `name` VARCHAR(255) NOT NULL");
    }

    public function down(Schema $schema): void
    {
        $corruptedCol = "\xd1\x82\xd1\x84\xd1\xd1\x82\xd1name";
        $this->addSql("ALTER TABLE profile CHANGE `name` `{$corruptedCol}` VARCHAR(255) NOT NULL");
    }
}
