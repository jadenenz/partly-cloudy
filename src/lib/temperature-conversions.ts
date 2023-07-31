export function convertToFahrenheit(kelvin: number) {
  return Math.round((kelvin - 273.15) * 1.8 + 32)
}
