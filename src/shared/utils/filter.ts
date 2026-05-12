export function normalizeSearchValue(value: string) {
  return value.trim().toLowerCase()
}

export function includesSearchValue(value: string, searchValue: string) {
  return value.toLowerCase().includes(normalizeSearchValue(searchValue))
}
