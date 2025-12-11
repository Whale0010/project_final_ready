export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.substring(0, length) + "..." : str
}
