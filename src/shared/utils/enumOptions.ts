export interface EnumOption<T extends string> {
  label: string
  value: T
}

export function createEnumOptions<T extends string>(
  values: readonly T[],
  getLabel: (value: T) => string,
): EnumOption<T>[] {
  return values.map((value) => ({
    label: getLabel(value),
    value,
  }))
}
