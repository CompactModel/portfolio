// FALLBACK ONLY — цей файл використовується лише коли API недоступний І static-data.json не завантажився.
// Щоб змінити проекти на сайті — редагуй public/static-data.json або адмін-панель.

import { Project } from '../types/project';

const BASE = process.env.PUBLIC_URL || '';

export const STATIC_PROJECTS: Project[] = [
  { id: 1, title: 'APEX MOTOR',   description: 'Elite performance auto service — booking, services, team showcase. Dark UI with red accents.',                             link: 'https://compactmodel.github.io/demo-autoservice', image: `${BASE}/screenshots/autoservice.png` },
  { id: 2, title: 'BarberKing',   description: 'Premium barbershop landing page — services, pricing, gallery, online booking form.',                                       link: 'https://compactmodel.github.io/demo-barbershop',  image: `${BASE}/screenshots/barbershop.png`  },
  { id: 3, title: 'La Bella',     description: 'Fine dining restaurant site — menu, reservations, chef story, atmosphere gallery.',                                        link: 'https://compactmodel.github.io/demo-restaurant',  image: `${BASE}/screenshots/restaurant.png`  },
  { id: 4, title: 'Brew & Soul',  description: 'Demo café website with warm amber design, steam animations, drawer menu and multilingual support (EN/DE/UK).',            link: 'https://compactmodel.github.io/demo-cafe',        image: `${BASE}/screenshots/cafe.png`        },
  { id: 5, title: 'Sultan Döner', description: 'Demo kebab restaurant with dark green & orange design, fire animations, fullscreen menu and multilingual support.',       link: 'https://compactmodel.github.io/demo-kebab',       image: `${BASE}/screenshots/kebab.png`       },
  { id: 7, title: 'Hotel Dolgow', description: 'Demo hotel website with elegant wine & cream design, room booking modal, restaurant section, photo gallery and DE/EN multilingual support.', link: 'https://compactmodel.github.io/demo-hotel', image: `${BASE}/screenshots/hotel.png` },
];
