export function formatDate(value?: string) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function toDateInputValue(value?: string) {
  return value ? value.slice(0, 10) : ''
}

export function toTimeInputValue(value?: string) {
  if (!value) {
    return ''
  }

  const match = value.match(/^(\d{1,2}):(\d{2})/)

  if (!match) {
    return value.slice(0, 5)
  }

  return `${match[1].padStart(2, '0')}:${match[2]}`
}

export function toTimeApiValue(value: string) {
  return value.length === 5 ? `${value}:00` : value
}

export function formatTime(value?: string) {
  if (!value) {
    return '-'
  }

  return toTimeInputValue(value)
}
