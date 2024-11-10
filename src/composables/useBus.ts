export function useBus() {
  const listeners = new Map<string, Set<Function>>()

  function on(event: string, callback: Function) {
    if (!listeners.has(event)) {
      listeners.set(event, new Set())
    }
    listeners.get(event)?.add(callback)
  }

  function off(event: string, callback: Function) {
    listeners.get(event)?.delete(callback)
  }

  function emit(event: string, ...args: any[]) {
    listeners.get(event)?.forEach((callback) => callback(...args))
  }

  return {
    on,
    off,
    emit,
  }
}