<?php
namespace App\Controller\Admin;

use App\Entity\Profile;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;

class ProfileCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Profile::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('name', 'Name'),
            TextField::new('title', 'Title / Position'),
            TextareaField::new('bio', 'Bio'),
            TextField::new('avatar', 'Avatar URL')->setRequired(false),
            TextField::new('email', 'Email')->setRequired(false),
            TextField::new('telegram', 'Telegram URL')->setRequired(false)->setHelp('e.g. https://t.me/username'),
            TextField::new('github', 'GitHub URL')->setRequired(false)->setHelp('e.g. https://github.com/username'),
        ];
    }
}