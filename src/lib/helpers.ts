export const CAT_COLORS: Record<string, string> = {
  'Piala Dunia': '#FFD700',
  'UCL': '#2196F3',
  'Liga 1': '#e91e63',
  'La Liga': '#9c27b0',
  'Transfer': '#ff6d00',
  'Timnas': '#00C853',
  'Serie A': '#1565C0',
  'Premier League': '#6d1b7b',
  'Bundesliga': '#d32f2f',
}

export const CATEGORIES = Object.keys(CAT_COLORS)
export const catColor = (cat: string) => CAT_COLORS[cat] || '#555'

export const CAT_EMOJI: Record<string, string> = {
  'Piala Dunia': '🏆', 'UCL': '🌟', 'Liga 1': '⚽',
  'La Liga': '⚽', 'Transfer': '🔄', 'Timnas': '🇮🇩',
  'Serie A': '🏆', 'Premier League': '⚽', 'Bundesliga': '⚽',
}

export function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return `${diff}d lalu`
  if (diff < 3600) return `${Math.floor(diff / 60)}m lalu`
  if (diff < 86400) return `${Math.floor(diff / 3600)}j lalu`
  return `${Math.floor(diff / 86400)} hari lalu`
}
