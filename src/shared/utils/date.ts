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

export const TIME_FORMAT = 'HH:mm'

export function toTimeInputValue(value?: string) {
  if (!value) {
    return ''
  }

  const match = value.match(/^(\d{1,2}):(\d{2})/)

  if (!match) {
    return value.slice(0, 5)
  }

  const hours = Number(match[1])
  const minutes = Number(match[2])

  if (Number.isNaN(hours) || Number.isNaN(minutes) || hours > 23 || minutes > 59) {
    return value.slice(0, 5)
  }

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

export function toTimeApiValue(value: string) {
  return value.length === 5 ? `${value}:00` : value
}

export function formatTime(value?: string) {
  const normalized = toTimeInputValue(value)

  if (!normalized) {
    return '-'
  }

  const [hours, minutes] = normalized.split(':').map(Number)

  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
  }).format(new Date(2000, 0, 1, hours, minutes))
}
