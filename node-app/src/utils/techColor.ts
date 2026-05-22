export const PINK = '#6366F1';

const TECH_COLORS: Record<string, string> = {
  react: '#61DAFB', typescript: '#3178C6', javascript: '#F7DF1E', php: '#8892BF',
  symfony: '#6366F1', docker: '#2496ED', mysql: '#4479A1', nginx: '#009639',
  git: '#F05032', github: '#24292F', easyadmin: '#6366F1', tailwind: '#06B6D4',
  node: '#339933', css: '#1572B6', html: '#E34F26', linux: '#FCC624',
  api: '#6366F1', devops: '#ff80bf', rest: '#6366F1',
};

export function techColor(name: string): string {
  const low = name.toLowerCase();
  for (const k of Object.keys(TECH_COLORS)) if (low.includes(k)) return TECH_COLORS[k];
  return PINK;
}
