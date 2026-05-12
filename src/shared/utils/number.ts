export const decimalFormatter = new Intl.NumberFormat('en', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
})

export function parseOptionalNumber(value: string) {
  return value === '' ? undefined : Number(value)
}
