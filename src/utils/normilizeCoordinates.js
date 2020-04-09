export function normCoords(coord) {
  return `${Math.floor(coord)}°${Math.floor(
    (coord - Math.floor(coord)) * 60
  )}'`;
}
