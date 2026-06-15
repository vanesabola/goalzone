export function toSlug(title: string, id: number): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .slice(0, 60) + '-' + id
}

export function getIdFromSlug(slug: string): number {
  const parts = slug.split('-')
  return parseInt(parts[parts.length - 1])
}