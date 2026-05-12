import { useState } from 'react'

export function useTableFilters<TFilters extends object>(initialFilters: TFilters) {
  const [filters, setFilters] = useState<TFilters>(initialFilters)

  const updateFilter = (name: Extract<keyof TFilters, string>, value: string) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }))
  }

  const resetFilters = () => {
    setFilters(initialFilters)
  }

  return {
    filters,
    resetFilters,
    updateFilter,
  }
}
