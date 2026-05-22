export function inferTags(title: string, desc: string): string[] {
  const text = (title + ' ' + desc).toLowerCase();
  const tags: string[] = [];
  if (text.includes('react') || text.includes('typescript')) tags.push('React');
  if (text.includes('symfony') || text.includes('php'))      tags.push('Symfony');
  if (text.includes('docker'))                               tags.push('Docker');
  if (!tags.length)                                          tags.push('HTML/CSS', 'JavaScript');
  return tags.slice(0, 3);
}
