<?php

namespace App\Controller\Admin;

use EasyCorp\Bundle\EasyAdminBundle\Attribute\AdminDashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;

#[AdminDashboard(routePath: '/admin', routeName: 'admin')]
class DashboardController extends AbstractDashboardController
{
    public function __construct(private AdminUrlGenerator $adminUrlGenerator) {}

    public function index(): Response
    {
        $url = $this->adminUrlGenerator
            ->setController(ProjectCrudController::class)
            ->generateUrl();

        return $this->redirect($url);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()->setTitle('Portfolio Admin');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', null);
        yield MenuItem::linkToRoute('Profile',    null, 'admin_profile_index');
        yield MenuItem::linkToRoute('Projects',   null, 'admin_project_index');
        yield MenuItem::linkToRoute('Skills',     null, 'admin_skill_index');
        yield MenuItem::linkToRoute('Education',  null, 'admin_education_index');
        yield MenuItem::linkToRoute('Messages',   null, 'admin_contact_index');
    }
}
