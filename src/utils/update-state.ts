export function updateURLState(key: string, value: string | number) {
  const { search } = window.location

  const params = new URLSearchParams(search)

  params.set(key, String(value))

  window.history.replaceState('', '', `?${params.toString()}`)
}