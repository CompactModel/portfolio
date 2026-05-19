<?php
namespace App\Controller\Api;

use App\Entity\Contact;
use App\Repository\ProfileRepository;
use App\Repository\ProjectRepository;
use App\Repository\SkillRepository;
use App\Repository\ExperienceRepository;
use App\Repository\EducationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api')]
class ApiController extends AbstractController
{
    #[Route('/profile', name: 'api_profile', methods: ['GET'])]
    public function profile(ProfileRepository $repo): JsonResponse
    {
        $profile = $repo->findOneBy([]);

        if (!$profile) {
            return $this->json(null);
        }

        return $this->json([
            'id'     => $profile->getId(),
            'name'   => $profile->getName(),
            'title'  => $profile->getTitle(),
            'bio'    => $profile->getBio(),
            'avatar' => $profile->getAvatar(),
        ]);
    }

    #[Route('/projects', name: 'api_projects', methods: ['GET'])]
    public function projects(ProjectRepository $repo): JsonResponse
    {
        $projects = $repo->findAll();
        $data = [];

        foreach ($projects as $project) {
            $data[] = [
                'id'          => $project->getId(),
                'title'       => $project->getTitle(),
                'description' => $project->getDescription(),
                'link'        => $project->getLink(),
                'image'       => $project->getImage(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/skills', name: 'api_skills', methods: ['GET'])]
    public function skills(SkillRepository $repo): JsonResponse
    {
        $skills = $repo->findAll();
        $data = [];

        foreach ($skills as $skill) {
            $data[] = [
                'id'       => $skill->getId(),
                'name'     => $skill->getName(),
                'level'    => $skill->getLevel(),
                'category' => $skill->getCategory(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/experience', name: 'api_experience', methods: ['GET'])]
    public function experience(ExperienceRepository $repo): JsonResponse
    {
        $items = $repo->findAll();
        $data = [];

        foreach ($items as $item) {
            $data[] = [
                'id'          => $item->getId(),
                'company'     => $item->getCompany(),
                'position'    => $item->getPosition(),
                'startDate'   => $item->getStartDate()?->format('Y-m-d'),
                'endDate'     => $item->getEndDate()?->format('Y-m-d'),
                'description' => $item->getDescription(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/education', name: 'api_education', methods: ['GET'])]
    public function education(EducationRepository $repo): JsonResponse
    {
        $items = $repo->findAll();
        $data = [];

        foreach ($items as $item) {
            $data[] = [
                'id'          => $item->getId(),
                'institution' => $item->getInstitution(),
                'degree'      => $item->getDegree(),
                'startDate'   => $item->getStartDate()?->format('Y-m-d'),
                'endDate'     => $item->getEndDate()?->format('Y-m-d'),
                'description' => $item->getDescription(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/contact', name: 'api_contact_post', methods: ['POST'])]
    public function contactPost(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $body = json_decode($request->getContent(), true);

        if (empty($body['name']) || empty($body['email']) || empty($body['message'])) {
            return $this->json(['error' => 'All fields are required'], 400);
        }

        $contact = new Contact();
        $contact->setName($body['name']);
        $contact->setEmail($body['email']);
        $contact->setMessage($body['message']);
        $contact->setCreatedAt(new \DateTime());

        $em->persist($contact);
        $em->flush();

        return $this->json(['success' => true], 201);
    }
}