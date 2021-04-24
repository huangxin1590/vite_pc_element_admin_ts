interface Fn {
  (): void
}
interface DebounceReturn {
  (fn: Fn): void
}
export interface Debounce {
  (cb: Fn): void
}

export function debounce(delay: number): DebounceReturn {
  let timer: any
  return function (fn: any) {
    clearTimeout(timer)
    timer = setTimeout(() => fn(), delay)
  }
}
