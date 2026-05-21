import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      available:      'Available for work',
      hero_title:     "Hi, I'm",
      hero_highlight: 'Yan',
      hero_subtitle:  '— Full Stack Developer',
      hero_description: 'I build modern websites and web applications for businesses like cafés, salons, and service companies.',
      view_projects:  'View Projects',
      contact_me:     'Contact Me',

      nav_skills:     'Skills',
      nav_experience: 'Experience',
      nav_education:  'Education',
      nav_projects:   'Projects',
      nav_contact:    'Contact',

      no_skills:      'No skills yet. Add them in the admin panel.',
      no_experience:  'No experience yet. Add it in the admin panel.',
      no_education:   'No education yet. Add it in the admin panel.',
      no_projects:    'No projects yet. Add them in the admin panel.',
      present:        'Present',

      view_project:   'View Project →',

      contact_intro:  "Feel free to reach out — I'm open to new projects and opportunities.",
      form_name:      'Your name',
      form_email:     'Your email',
      form_message:   'Your message',
      form_send:      'Send Message',
      form_sending:   'Sending…',
      form_success:   'Message sent! I will get back to you soon.',
      form_error:     'Something went wrong. Please try again.',

      footer:         'Built with Symfony + React + Docker',
    }
  },
  de: {
    translation: {
      available:      'Verfügbar für Arbeit',
      hero_title:     'Hallo, ich bin',
      hero_highlight: 'Yan',
      hero_subtitle:  '— Full Stack Entwickler',
      hero_description: 'Ich erstelle moderne Websites und Webanwendungen für Unternehmen wie Cafés, Salons und Dienstleister.',
      view_projects:  'Projekte ansehen',
      contact_me:     'Kontakt',

      nav_skills:     'Fähigkeiten',
      nav_experience: 'Erfahrung',
      nav_education:  'Ausbildung',
      nav_projects:   'Projekte',
      nav_contact:    'Kontakt',

      no_skills:      'Noch keine Fähigkeiten. Im Admin-Panel hinzufügen.',
      no_experience:  'Noch keine Erfahrung. Im Admin-Panel hinzufügen.',
      no_education:   'Noch keine Ausbildung. Im Admin-Panel hinzufügen.',
      no_projects:    'Noch keine Projekte. Im Admin-Panel hinzufügen.',
      present:        'Heute',

      view_project:   'Projekt ansehen →',

      contact_intro:  'Schreib mir gerne — ich bin offen für neue Projekte und Möglichkeiten.',
      form_name:      'Dein Name',
      form_email:     'Deine E-Mail',
      form_message:   'Deine Nachricht',
      form_send:      'Nachricht senden',
      form_sending:   'Wird gesendet…',
      form_success:   'Nachricht gesendet! Ich melde mich bald.',
      form_error:     'Etwas ist schiefgelaufen. Bitte erneut versuchen.',

      footer:         'Erstellt mit Symfony + React + Docker',
    }
  },
  uk: {
    translation: {
      available:      'Доступний для роботи',
      hero_title:     'Привіт, я',
      hero_highlight: 'Ян',
      hero_subtitle:  '— Full Stack Розробник',
      hero_description: 'Я створюю сучасні веб-сайти та додатки для бізнесу — кафе, салонів, сервісних компаній.',
      view_projects:  'Переглянути проекти',
      contact_me:     "Зв'язатися",

      nav_skills:     'Навички',
      nav_experience: 'Досвід',
      nav_education:  'Освіта',
      nav_projects:   'Проекти',
      nav_contact:    'Контакти',

      no_skills:      'Навичок ще немає. Додай їх в адмін панелі.',
      no_experience:  'Досвіду ще немає. Додай його в адмін панелі.',
      no_education:   'Освіти ще немає. Додай її в адмін панелі.',
      no_projects:    'Проектів ще немає. Додай їх в адмін панелі.',
      present:        'Сьогодні',

      view_project:   'Переглянути проект →',

      contact_intro:  'Пиши — я відкритий до нових проектів і можливостей.',
      form_name:      "Твоє ім'я",
      form_email:     'Твій email',
      form_message:   'Твоє повідомлення',
      form_send:      'Надіслати',
      form_sending:   'Надсилання…',
      form_success:   'Повідомлення надіслано! Я зв\'яжусь з тобою незабаром.',
      form_error:     'Щось пішло не так. Спробуй ще раз.',

      footer:         'Створено з Symfony + React + Docker',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
