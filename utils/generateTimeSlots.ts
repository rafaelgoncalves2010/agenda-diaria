export function generateTimeSlots(start = 8, end = 18) {
  const slots: string[] = [];

  for (let hour = start; hour <= end; hour++) {
    slots.push(`${String(hour).padStart(2, "0")}:00`);
    if (hour !== end) {
      slots.push(`${String(hour).padStart(2, "0")}:30`);
    }
  }

  return slots;
}