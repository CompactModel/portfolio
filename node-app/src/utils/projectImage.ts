const BASE = process.env.PUBLIC_URL || '';

export function projectImage(title: string, fallback: string): string {
  const t = title.toLowerCase();
  if (t.includes('sultan') || t.includes('döner') || t.includes('kebab'))                                                     return `${BASE}/screenshots/kebab.png`;
  if (t.includes('auto') || t.includes('apex') || t.includes('motor') || t.includes('car'))                                  return `${BASE}/screenshots/autoservice.png`;
  if (t.includes('barber') || t.includes('hair') || t.includes('cut'))                                                        return `${BASE}/screenshots/barbershop.png`;
  if (t.includes('brew') || t.includes('soul') || t.includes('coffee') || t.includes('café') || t.includes('cafe'))          return `${BASE}/screenshots/cafe.png`;
  if (t.includes('restaurant') || t.includes('bella'))                                                                        return `${BASE}/screenshots/restaurant.png`;
  if (t.includes('hotel') || t.includes('dolgow'))                                                                            return `${BASE}/screenshots/hotel.png`;
  return fallback;
}
