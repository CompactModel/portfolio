export function formatDate(d: string | null, lang: string, presentLabel: string): string {
  return d
    ? new Date(d).toLocaleDateString(lang, { year: 'numeric', month: 'short' })
    : presentLabel;
}
