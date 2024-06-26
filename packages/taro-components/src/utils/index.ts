export function throttle (fn, threshold = 250, scope?) {
  let lastTime = 0
  let deferTimer: ReturnType<typeof setTimeout>
  return function (...args) {
    const context = scope || this
    const now = Date.now()
    if (now - lastTime > threshold) {
      fn.apply(this, args)
      lastTime = now
    } else {
      clearTimeout(deferTimer)
      deferTimer = setTimeout(() => {
        lastTime = now
        fn.apply(context, args)
      }, threshold)
    }
  }
}

export function debounce (fn, ms = 250, scope?) {
  let timer: ReturnType<typeof setTimeout>

  return function (...args) {
    const context = scope || this
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, ms)
  }
}

export * from './helper'
export * from './style'
export * from './url'

export function isVisible (e: HTMLElement) {
  return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
}

export function isElement (e: HTMLElement) {
  return typeof HTMLElement === 'object'
    ? e instanceof HTMLElement
    : e && typeof e === 'object' && e !== null && e.nodeType === 1 && typeof e.nodeName === 'string'
}

export function isNode (e: Node) {
  return typeof Node === 'object'
    ? e instanceof Node
    : e && typeof e === 'object' && e !== null && typeof e.nodeType === 'number' && typeof e.nodeName === 'string'
}
