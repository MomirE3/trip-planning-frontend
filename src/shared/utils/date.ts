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
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm'

export function toDateTimeInputValue(value?: string) {
  if (!value) {
    return ''
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value.slice(0, 16).replace('T', ' ')
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}`
}

export function toDateTimeApiValue(value: string) {
  if (value.includes('T')) {
    return value
  }

  return `${value.replace(' ', 'T')}:00`
}

export function formatDateTime(value?: string) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

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
