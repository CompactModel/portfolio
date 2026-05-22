<?php

namespace App\Controller\Admin;

use App\Entity\Skill;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class SkillCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Skill::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('name', 'Skill Name'),
            ChoiceField::new('level', 'Level')
                ->setChoices([
                    'Beginner'     => 'beginner',
                    'Intermediate' => 'intermediate',
                    'Advanced'     => 'advanced',
                ])
                ->setRequired(false),
            ChoiceField::new('category', 'Category')
                ->setChoices([
                    'Frontend' => 'Frontend',
                    'Backend'  => 'Backend',
                    'Database' => 'Database',
                    'Tools'    => 'Tools',
                    'Other'    => 'Other',
                ])
                ->setRequired(false),
        ];
    }
}
