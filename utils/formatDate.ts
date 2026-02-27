export function formatToday() {
  const today = new Date();

  const formatted = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(today);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}