import { Project } from '../types/project';

const BASE = process.env.PUBLIC_URL || '';

export const STATIC_PROJECTS: Project[] = [
  { id: 1, title: 'APEX MOTOR',   description: 'Elite performance auto service — booking, services, team showcase. Dark UI with red accents.',                                                  link: `${BASE}/demo-sites/autoservice/`, image: `${BASE}/screenshots/autoservice.png` },
  { id: 2, title: 'BarberKing',   description: 'Premium barbershop landing page — services, pricing, gallery, online booking form.',                                                            link: `${BASE}/demo-sites/barbershop/`,  image: `${BASE}/screenshots/barbershop.png`  },
  { id: 3, title: 'La Bella',     description: 'Fine dining restaurant site — menu, reservations, chef story, atmosphere gallery.',                                                             link: `${BASE}/demo-sites/restaurant/`,  image: `${BASE}/screenshots/restaurant.png`  },
  { id: 4, title: 'Brew & Soul',  description: 'Demo café website with warm amber design, steam animations, drawer menu and multilingual support (EN/DE/UK).',                                link: 'http://localhost:8084',           image: `${BASE}/screenshots/cafe.png`        },
  { id: 5, title: 'Sultan Döner', description: 'Demo kebab restaurant with dark green & orange design, fire animations, fullscreen menu and multilingual support.',                           link: 'https://compactmodel.github.io/demo-kebab', image: `${BASE}/screenshots/kebab.png` },
  { id: 6, title: 'VoltGarage',   description: 'Demo auto service with tech dark design, glitch effects, animated stats, reviews and online booking.',                                         link: 'http://localhost:8086',           image: `${BASE}/screenshots/voltgarage.png`  },
];
